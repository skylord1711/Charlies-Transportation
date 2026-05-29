import Link from "next/link"
import type { FleetItem } from "@/types/content"

interface FleetPreviewProps {
  fleet: FleetItem[]
}

export default function FleetPreview({ fleet }: FleetPreviewProps) {
  if (!fleet || fleet.length === 0) return null

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Fleet
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Modern, well-maintained vehicles to meet your transportation needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fleet.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-slate-700"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-slate-700 flex items-center justify-center">
                <svg className="w-24 h-24 text-blue-400 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 17h14M5 17l-2-8h16l-2 8" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9h18" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {vehicle.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                  {vehicle.type} &middot; {vehicle.capacity}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {vehicle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/fleet"
            className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
          >
            View Full Fleet
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
