'use client'

import { TodoItemType } from "@/type/todoItem"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

type TodoFormProps = {
    id?: string
    title: string
    description: string
    isNew: boolean
}

type TodoBodyType = {
    title: string
    description: string
}

const updateTodo = async (id: string, body: TodoBodyType) => {
    try {
        const { data } = await axios.put<TodoItemType>(`http://localhost:8000/todoitem/update/${id}`, body)
        return data
    } catch (error) {
        console.error(error)
    }
}

const createTodo = async (body: TodoBodyType) => {
    try {
        const { data } = await axios.post<TodoItemType>(`http://localhost:8000/todoitem/new`, body)
        return data
    } catch (error) {
        console.error(error)
    }
}

const deleteTodo = async (id?: string) => {
    if (!id) return
    try {
        const { data } = await axios.delete(`http://localhost:8000/todoitem/delete/${id}`)
        return data
    } catch (error) {
        console.error(error)
    }
}

export default function TodoForm(params: TodoFormProps) {
    const router = useRouter()

    const [title, setTitle] = useState(params.title)
    const [description, setDescription] = useState(params.description)

    const handleClick = (e: any) => {
        e.preventDefault()
        if (params.isNew) {
            return router.push('/')
        }
        return router.push(`/${params.id}`)
    }

    const updateMutation = useMutation({
        mutationFn: (todo: TodoBodyType) => params.id ? updateTodo(params.id, todo) : createTodo(todo),
        onSuccess: (data) => router.push(`/${data?.id}`)
    })


    const deleteMutation = useMutation({
        mutationFn: () => deleteTodo(params.id),
        onSuccess: () => router.push('/')
    })


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        updateMutation.mutate({ title, description })
    }

    const handleClickDelete = (e: any) => {
        e.preventDefault()
        deleteMutation.mutate()
    }

    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Título
                    </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Título"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descrição
                    </label>
                    <textarea
                        id="description"
                        rows={8}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="shadow block p-2.5 w-full text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Escreva sua descrição aqui"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer" onClick={handleClick}>
                        Voltar
                    </a>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Salvar
                    </button>
                </div>
                {!params.isNew && (
                    <div className="flex items-center justify-content-center mt-8">
                        <a
                            className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
                            onClick={handleClickDelete}
                        >
                            Excluir
                        </a>
                    </div>
                )}
            </form>
        </div>
    )
}