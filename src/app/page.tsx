'use client'

import TodoList from '@/component/TodoList'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="max-w-lg mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">TODOIST frontend</h1>
          </header>
          <TodoList />
        </div>
      </main>
    </QueryClientProvider>
  )
}
