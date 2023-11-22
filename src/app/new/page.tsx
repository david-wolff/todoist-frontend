'use client'

import TodoForm from "@/components/TodoForm"
import { parse } from "@/helper/queryParamParser"
import { TodoItemType } from "@/type/todoItem"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "next/navigation"


const fetchTodoItem = async (id: string) => {
  try {
    const { data } = await axios.get<TodoItemType>(`http://localhost:8000/todoitem/${id}`)

    return data
  } catch (error) {
    console.error(error)
  }
}

export default function New() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-lg mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Novo item</h1>
        </header>
        <TodoForm title="" description="" isNew={true} />
      </div>
    </main>
  )
}