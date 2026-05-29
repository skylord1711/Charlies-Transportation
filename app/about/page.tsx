import { getContent } from "@/lib/content"

export default function AboutPage() {
  const content = getContent()

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {content.about.title}
          </h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          {content.about.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
            &ldquo;{content.about.mission}&rdquo;
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.about.values.map((value, i) => (
              <div
                key={i}
                className="flex items-start space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700"
              >
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 dark:text-gray-300">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
