'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const activeTab = pathname === '/chat' ? 'chat' : 'dashboard'

  return (
    <header className="bg-orbyte-blue text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">ORBYTE</h1>
            <nav className="flex space-x-6">
              <Link
                href="/"
                className={`px-3 py-2 rounded ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-700 font-semibold'
                    : 'hover:bg-blue-700/50'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/chat"
                className={`px-3 py-2 rounded ${
                  activeTab === 'chat'
                    ? 'bg-blue-700 font-semibold'
                    : 'hover:bg-blue-700/50'
                }`}
              >
                Chat
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-blue-700 rounded">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-blue-700 rounded">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

