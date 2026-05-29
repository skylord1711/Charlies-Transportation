import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">Charlie&apos;s Transportation</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted private-pay transportation service in Rahway, NJ.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact" },
                { href: "/booking", label: "Book Now" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:732-381-6000" className="hover:text-blue-400 transition-colors">
                  732-381-6000
                </a>
              </li>
              <li>
                <a href="mailto:nazihmafargeh@gmail.com" className="hover:text-blue-400 transition-colors">
                  nazihmafargeh@gmail.com
                </a>
              </li>
              <li className="text-gray-400">187 Wescott Dr, Rahway, NJ 07065</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Charlie&apos;s Transportation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
