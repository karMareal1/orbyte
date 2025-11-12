'use client'

import Header from '@/components/Header'
import ChatInterface from '@/components/ChatInterface'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <ChatInterface />
      </main>
    </div>
  )
}

