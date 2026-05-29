"use client"

import { useEffect, useState, type FormEvent } from "react"

interface FleetItem {
  id: string
  name: string
  type: string
  capacity: string
  description: string
  features: string[]
  image: string
}

export default function AdminFleetPage() {
  const [fleet, setFleet] = useState<FleetItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetchFleet()
  }, [])

  const fetchFleet = async () => {
    try {
      const res = await fetch("/api/admin/content?type=fleet")
      if (res.ok) {
        const data = await res.json()
        setFleet(data)
      }
    } catch (err) {
      console.error("Failed to load fleet", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)

    try {
      const res = await fetch("/api/admin/content?type=fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fleet),
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

  const addVehicle = () => {
    const newId = `vehicle-${Date.now()}`
    setFleet([...fleet, { id: newId, name: "", type: "", capacity: "", description: "", features: [""], image: "" }])
  }

  const removeVehicle = (index: number) => {
    setFleet(fleet.filter((_, i) => i !== index))
  }

  const updateVehicle = (index: number, field: string, value: string) => {
    const updated = [...fleet]
    updated[index] = { ...updated[index], [field]: value }
    setFleet(updated)
  }

  const addFeature = (vehicleIndex: number) => {
    const updated = [...fleet]
    updated[vehicleIndex].features.push("")
    setFleet(updated)
  }

  const removeFeature = (vehicleIndex: number, featureIndex: number) => {
    const updated = [...fleet]
    updated[vehicleIndex].features = updated[vehicleIndex].features.filter((_, i) => i !== featureIndex)
    setFleet(updated)
  }

  const updateFeature = (vehicleIndex: number, featureIndex: number, value: string) => {
    const updated = [...fleet]
    updated[vehicleIndex].features[featureIndex] = value
    setFleet(updated)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Fleet Editor</h1>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={addVehicle}
            className="px-4 py-2.5 rounded-lg border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          >
            + Add Vehicle
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {fleet.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
            <p className="text-gray-500 dark:text-gray-400">No vehicles yet. Click &quot;Add Vehicle&quot; to get started.</p>
          </div>
        )}

        {fleet.map((vehicle, index) => (
          <div key={vehicle.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Vehicle {index + 1}
              </h2>
              <button
                type="button"
                onClick={() => removeVehicle(index)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Name</label>
                <input type="text" value={vehicle.name} onChange={(e) => updateVehicle(index, "name", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Luxury Sedan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <input type="text" value={vehicle.type} onChange={(e) => updateVehicle(index, "type", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Sedan" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity</label>
                <input type="text" value={vehicle.capacity} onChange={(e) => updateVehicle(index, "capacity", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="4 passengers" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL (optional)</label>
                <input type="text" value={vehicle.image} onChange={(e) => updateVehicle(index, "image", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="/uploads/vehicle.jpg" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea rows={3} value={vehicle.description} onChange={(e) => updateVehicle(index, "description", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Features</label>
                <button type="button" onClick={() => addFeature(index)} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">+ Add Feature</button>
              </div>
              <div className="space-y-2">
                {vehicle.features.map((feature, fi) => (
                  <div key={fi} className="flex items-center space-x-2">
                    <input type="text" value={feature} onChange={(e) => updateFeature(index, fi, e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm" placeholder="Leather seating" />
                    <button type="button" onClick={() => removeFeature(index, fi)} className="text-red-500 hover:text-red-700">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}
