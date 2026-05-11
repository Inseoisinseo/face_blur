import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { createClient } from '@supabase/supabase-js'
import { buildPrompt } from '@/lib/prompts'

export const maxDuration = 60

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: 'Gemini API 키가 서버에 설정되지 않았습니다. Vercel 환경 변수를 확인해주세요.' }, { status: 500 })
  }

  // Authenticate user
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 })
  }

  // Deduct 1 credit atomically
  const { data: newCredits, error: deductError } = await adminSupabase.rpc('deduct_user_credit', {
    p_user_id: user.id,
  })

  if (deductError) {
    return NextResponse.json({ error: '크레딧 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }

  if (newCredits === -1) {
    return NextResponse.json({ error: '크레딧이 부족합니다. 플랜을 업그레이드해주세요.' }, { status: 402 })
  }

  try {
    const { imageBase64, mimeType, prompt, tool, name: originalName } = await request.json()

    const textPrompt = buildPrompt(tool, prompt ?? '')

    const contents: string | { text?: string; inlineData?: { mimeType: string; data: string } }[] = imageBase64
      ? [
          { text: textPrompt },
          { inlineData: { mimeType: mimeType ?? 'image/jpeg', data: imageBase64 } },
        ]
      : textPrompt

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents,
    })

    const candidate = response.candidates?.[0]
    if (!candidate) {
      // Refund credit on failure
      await adminSupabase.rpc('increment_user_credits', { p_user_id: user.id, p_amount: 1 })
      return NextResponse.json({ error: '응답을 받지 못했습니다.' }, { status: 500 })
    }

    let resultText = ''
    let resultImageBase64 = ''
    let resultMimeType = 'image/png'

    for (const part of candidate.content?.parts ?? []) {
      if (part.text) {
        resultText = part.text
      } else if (part.inlineData) {
        resultImageBase64 = part.inlineData.data ?? ''
        resultMimeType = part.inlineData.mimeType ?? 'image/png'
      }
    }

    if (!resultImageBase64) {
      // Refund credit on failure
      await adminSupabase.rpc('increment_user_credits', { p_user_id: user.id, p_amount: 1 })
      return NextResponse.json(
        { error: '이미지가 생성되지 않았습니다. 다시 시도해주세요.', text: resultText },
        { status: 500 }
      )
    }

    // Save result to Supabase Storage + record in blurpic table
    try {
      const ext = resultMimeType.includes('png') ? 'png' : 'jpg'
      const recordId = crypto.randomUUID()
      const storagePath = `${user.id}/${recordId}.${ext}`
      const imageBuffer = Buffer.from(resultImageBase64, 'base64')

      const { error: uploadError } = await adminSupabase.storage
        .from('blurimage')
        .upload(storagePath, imageBuffer, { contentType: resultMimeType })

      if (!uploadError) {
        await adminSupabase.from('blurpic').insert({
          id: recordId,
          user_id: user.id,
          original_filename: originalName ?? `image.${ext}`,
          blurred_path: storagePath,
          method: tool && ['blur', 'mosaic', 'emoji', 'auto'].includes(tool) ? tool : 'auto',
          status: 'completed',
          prompt: prompt ?? null,
        })
      }
    } catch {
      // Non-critical: log skipped, don't block the response
    }

    return NextResponse.json({
      imageBase64: resultImageBase64,
      mimeType: resultMimeType,
      text: resultText,
    })
  } catch (error) {
    // Refund credit on unexpected error
    await adminSupabase.rpc('increment_user_credits', { p_user_id: user.id, p_amount: 1 })
    console.error('Gemini API error:', error)
    return NextResponse.json({ error: '처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
