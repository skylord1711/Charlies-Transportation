export interface SiteContent {
  home: {
    heroTitle: string
    heroSubtitle: string
    servicesTitle: string
    servicesDescription: string
    whyChooseUsTitle: string
    whyChooseUsPoints: { title: string; description: string }[]
    ctaTitle: string
    ctaText: string
  }
  about: {
    title: string
    content: string
    mission: string
    values: string[]
  }
  services: {
    title: string
    description: string
    services: { title: string; description: string; icon?: string }[]
  }
}
export interface ContactInfo {
  phone: string
  email: string
  address: string
  hours: string
}

export interface ServiceItem {
  title: string
  description: string
  icon: string
}
