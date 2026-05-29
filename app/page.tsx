import HeroSection from "@/components/HeroSection"
import ServicesPreview from "@/components/ServicesPreview"
import FleetPreview from "@/components/FleetPreview"
import WhyChooseUs from "@/components/WhyChooseUs"
import CTASection from "@/components/CTASection"
import { getContent, getFleet } from "@/lib/content"

export default function HomePage() {
  const content = getContent()
  const fleet = getFleet()

  return (
    <>
      <HeroSection
        title={content.home.heroTitle}
        subtitle={content.home.heroSubtitle}
      />
      <ServicesPreview
        title={content.home.servicesTitle}
        description={content.home.servicesDescription}
        services={content.services.services}
      />
      <FleetPreview fleet={fleet} />
      <WhyChooseUs
        title={content.home.whyChooseUsTitle}
        points={content.home.whyChooseUsPoints}
      />
      <CTASection
        title={content.home.ctaTitle}
        text={content.home.ctaText}
      />
    </>
  )
}
