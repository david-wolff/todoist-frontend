'use client'

import TodoForm from "@/components/TodoForm"
import { parse } from "@/helper/queryParamParser"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useParams } from "next/navigation"

const queryClient = new QueryClient()


export default function Edit() {
    const { id } = useParams()
    return (
        <QueryClientProvider client={queryClient}>
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="max-w-lg mx-auto">
              <header className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-800">Edit item: {id}</h1>
              </header>
              <TodoForm id={parse(id)} />
            </div>
          </main>
        </QueryClientProvider>
      )
}