'use client'

import TodoList from '@/components/TodoList'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleClickNew = (e: any) => {
    e.preventDefault()
    router.push('/new')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-lg mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">TODOIST</h1>
        </header>
        <TodoList />
        <button
          className="fixed bottom-12 left-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleClickNew}
        >
          Novo
        </button>
      </div>
    </main>
  )
}
