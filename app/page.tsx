import HeroSection from "@/components/HeroSection"
import ServicesPreview from "@/components/ServicesPreview"
import WhyChooseUs from "@/components/WhyChooseUs"
import CTASection from "@/components/CTASection"
import { getContent } from "@/lib/content"

export default function HomePage() {
  const content = getContent()

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
