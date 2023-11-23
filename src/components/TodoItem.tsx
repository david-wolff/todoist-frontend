'use client'
import {
    useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import Spinner from './Spinner'
import { useRouter } from 'next/navigation'
import { dateFormater } from '@/helper/dateFormater'


const fetchTodoItem = async (id: string) => {
    try {
        const { data } = await axios.get(`http://localhost:8000/todoitem/${id}`)

        return data
    } catch (error) {
        console.error(error)
    }
}

type TodoItemProps = {
    id: string
}

export default function TodoItem(params: TodoItemProps) {
    const router = useRouter()

    const { data: item, isLoading, isError } = useQuery({
        queryKey: ['fetchTodoItem'],
        queryFn: () => fetchTodoItem(params.id),
    });


    const handleClickBack = (e: any) => {
        e.preventDefault()
        router.push('/')
    }

    const handleClickEdit = (e: any) => {
        e.preventDefault()
        router.push(`/${params.id}/edit`)
    }


    const displayList = !isLoading && !isError

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {isLoading && <Spinner />}
            <div className="flex items-center space-x-4 w-100">
                {displayList && (
                    <div>
                        <div className='flex'>
                            <h3 className="text-lg font-semibold mr-2">{item.title}</h3>
                            {item.done && (
                                <svg className="w-6 h-6 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z" />
                                </svg>
                            )}
                        </div>
                        <p className="my-8 text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-500">Data de edição: {dateFormater(item.updated_at)}</p>
                        <p className="text-sm text-gray-500">Data de criação: {dateFormater(item.created_at)}</p>
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between mt-12">
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer" onClick={handleClickBack}>
                    Voltar
                </a>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClickEdit}>
                    Editar
                </button>
            </div>
        </div>
    )
}