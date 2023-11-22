'use client'

import TodoItem from '@/components/TodoItem'
import { parse } from "@/helper/queryParamParser"

import { useParams } from 'next/navigation'


export default function Detail() {

  const { id } = useParams()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-lg mx-auto">
        <header className="text-center mb-8">
          {/* <h1 className="text-3xl font-semibold text-gray-800">Detalhes do item: {id}</h1> */}
        </header>
        <TodoItem id={parse(id)} />
      </div>
    </main>
  )
}
