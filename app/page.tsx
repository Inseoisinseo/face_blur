import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LandingNavbar } from '@/components/main/navbar'
import { HeroSection } from '@/components/main/hero'
import { FeaturesSection } from '@/components/main/features'
import { PricingSection } from '@/components/main/pricing'
import { CTASection } from '@/components/main/cta'
import { Footer } from '@/components/main/footer'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <>
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
