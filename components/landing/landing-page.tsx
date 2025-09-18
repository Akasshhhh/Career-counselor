"use client"

import { HeroSection } from "./hero-section"
import { FeaturesSection } from "./features-section"
import { CTASection } from "./cta-section"

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  )
}
