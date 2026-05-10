import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { buildPrompt } from '@/lib/prompts'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! })

export async function POST(request: NextRequest) {
  try {
    const { imageBase64, mimeType, prompt, tool } = await request.json()

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
      return NextResponse.json(
        { error: '이미지가 생성되지 않았습니다. 다시 시도해주세요.', text: resultText },
        { status: 500 }
      )
    }

    return NextResponse.json({
      imageBase64: resultImageBase64,
      mimeType: resultMimeType,
      text: resultText,
    })
  } catch (error) {
    console.error('Gemini API error:', error)
    return NextResponse.json({ error: '처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
