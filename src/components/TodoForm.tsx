'use client'

import { useRouter } from "next/navigation"


type TodoFormProps = {
    id: string
}

export default function TodoForm(params: TodoFormProps) {

    const router = useRouter()

    console.log(params)

    const handleClick = (e: any) => {
        e.preventDefault()
        router.push(`/${params.id}`)
      }

    return (
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Título
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Título" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Descrição
                    </label>
                    <textarea id="description" rows={8} className="shadow block p-2.5 w-full text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Escreva sua descrição aqui" />
                </div>
                <div className="flex items-center justify-between">
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer" onClick={handleClick}>
                        Voltar
                    </a>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Editar
                    </button>
                </div>
            </form>
        </div>
    )
}