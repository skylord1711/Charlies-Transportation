"use client"

import { useEffect, useState, type FormEvent } from "react"

interface SiteContent {
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
    services: { title: string; description: string; icon: string }[]
  }
}

const defaultContent: SiteContent = {
  home: {
    heroTitle: "",
    heroSubtitle: "",
    servicesTitle: "",
    servicesDescription: "",
    whyChooseUsTitle: "",
    whyChooseUsPoints: [{ title: "", description: "" }],
    ctaTitle: "",
    ctaText: "",
  },
  about: {
    title: "",
    content: "",
    mission: "",
    values: [""],
  },
  services: {
    title: "",
    description: "",
    services: [{ title: "", description: "", icon: "medical" }],
  },
}

export default function AdminPagesPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeSection, setActiveSection] = useState<"home" | "about" | "services">("home")

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/admin/content?type=content")
      if (res.ok) {
        const data = await res.json()
        setContent(data)
      }
    } catch (err) {
      console.error("Failed to load content", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)

    try {
      const res = await fetch("/api/admin/content?type=content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (err) {
      console.error("Failed to save", err)
    } finally {
      setSaving(false)
    }
  }

  const addWhyChooseUsPoint = () => {
    setContent({
      ...content,
      home: {
        ...content.home,
        whyChooseUsPoints: [...content.home.whyChooseUsPoints, { title: "", description: "" }],
      },
    })
  }

  const removeWhyChooseUsPoint = (index: number) => {
    const points = content.home.whyChooseUsPoints.filter((_, i) => i !== index)
    setContent({ ...content, home: { ...content.home, whyChooseUsPoints: points } })
  }

  const addValue = () => {
    setContent({ ...content, about: { ...content.about, values: [...content.about.values, ""] } })
  }

  const removeValue = (index: number) => {
    const values = content.about.values.filter((_, i) => i !== index)
    setContent({ ...content, about: { ...content.about, values } })
  }

  const addService = () => {
    setContent({
      ...content,
      services: {
        ...content.services,
        services: [...content.services.services, { title: "", description: "", icon: "medical" }],
      },
    })
  }

  const removeService = (index: number) => {
    const services = content.services.services.filter((_, i) => i !== index)
    setContent({ ...content, services: { ...content.services, services } })
  }

  const updateService = (index: number, field: string, value: string) => {
    const services = [...content.services.services]
    services[index] = { ...services[index], [field]: value }
    setContent({ ...content, services: { ...content.services, services } })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  const tabs = [
    { id: "home" as const, label: "Home Page" },
    { id: "about" as const, label: "About Page" },
    { id: "services" as const, label: "Services Page" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pages Editor</h1>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === tab.id
                ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeSection === "home" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Title</label>
                  <input type="text" value={content.home.heroTitle} onChange={(e) => setContent({ ...content, home: { ...content.home, heroTitle: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hero Subtitle</label>
                  <textarea rows={3} value={content.home.heroSubtitle} onChange={(e) => setContent({ ...content, home: { ...content.home, heroSubtitle: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Title</label>
                  <input type="text" value={content.home.servicesTitle} onChange={(e) => setContent({ ...content, home: { ...content.home, servicesTitle: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Description</label>
                  <textarea rows={3} value={content.home.servicesDescription} onChange={(e) => setContent({ ...content, home: { ...content.home, servicesDescription: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Why Choose Us</h2>
                <button type="button" onClick={addWhyChooseUsPoint} className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50">
                  + Add Point
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Title</label>
                  <input type="text" value={content.home.whyChooseUsTitle} onChange={(e) => setContent({ ...content, home: { ...content.home, whyChooseUsTitle: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
                {content.home.whyChooseUsPoints.map((point, i) => (
                  <div key={i} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Point {i + 1}</span>
                      <button type="button" onClick={() => removeWhyChooseUsPoint(i)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                    </div>
                    <div className="space-y-2">
                      <input type="text" placeholder="Title" value={point.title} onChange={(e) => { const points = [...content.home.whyChooseUsPoints]; points[i] = { ...points[i], title: e.target.value }; setContent({ ...content, home: { ...content.home, whyChooseUsPoints: points } }) }} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" />
                      <textarea rows={2} placeholder="Description" value={point.description} onChange={(e) => { const points = [...content.home.whyChooseUsPoints]; points[i] = { ...points[i], description: e.target.value }; setContent({ ...content, home: { ...content.home, whyChooseUsPoints: points } }) }} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">CTA Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CTA Title</label>
                  <input type="text" value={content.home.ctaTitle} onChange={(e) => setContent({ ...content, home: { ...content.home, ctaTitle: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CTA Text</label>
                  <textarea rows={2} value={content.home.ctaText} onChange={(e) => setContent({ ...content, home: { ...content.home, ctaText: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "about" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Page Content</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Page Title</label>
                  <input type="text" value={content.about.title} onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                  <textarea rows={8} value={content.about.content} onChange={(e) => setContent({ ...content, about: { ...content.about, content: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm" />
                  <p className="text-xs text-gray-500 mt-1">Use blank lines to separate paragraphs.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mission Statement</label>
                  <textarea rows={3} value={content.about.mission} onChange={(e) => setContent({ ...content, about: { ...content.about, mission: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Company Values</h2>
                <button type="button" onClick={addValue} className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50">
                  + Add Value
                </button>
              </div>
              <div className="space-y-3">
                {content.about.values.map((value, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input type="text" placeholder={`Value ${i + 1}`} value={value} onChange={(e) => { const values = [...content.about.values]; values[i] = e.target.value; setContent({ ...content, about: { ...content.about, values } }) }} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                    <button type="button" onClick={() => removeValue(i)} className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "services" && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services Page Header</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Page Title</label>
                  <input type="text" value={content.services.title} onChange={(e) => setContent({ ...content, services: { ...content.services, title: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Page Description</label>
                  <textarea rows={3} value={content.services.description} onChange={(e) => setContent({ ...content, services: { ...content.services, description: e.target.value } })} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Service Items</h2>
                <button type="button" onClick={addService} className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50">
                  + Add Service
                </button>
              </div>
              <div className="space-y-4">
                {content.services.services.map((service, i) => (
                  <div key={i} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Service {i + 1}</span>
                      <button type="button" onClick={() => removeService(i)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="Title" value={service.title} onChange={(e) => updateService(i, "title", e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" />
                      <select value={service.icon} onChange={(e) => updateService(i, "icon", e.target.value)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm">
                        <option value="medical">Medical</option>
                        <option value="social">Social</option>
                        <option value="errands">Errands</option>
                        <option value="airport">Airport</option>
                        <option value="accessible">Accessible</option>
                        <option value="event">Event</option>
                      </select>
                    </div>
                    <textarea rows={2} placeholder="Description" value={service.description} onChange={(e) => updateService(i, "description", e.target.value)} className="w-full mt-3 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
