'use client'
import {
    useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import { TodoItemType } from '@/type/todoItem'
import Spinner from './Spinner'
import { useRouter } from 'next/navigation'

const fetchAllTodos = async () => {
    try {
        const { data } = await axios.get('http://localhost:8000/todoitem/list')
        
        return data
    } catch (error) {
        console.error(error)
    }
}

const dateFormat = (date: string): String => {
    return new Date(date).toLocaleString()
}

export default function TodoList() {
  const router = useRouter()
  
    const { data: todoItems, isLoading } = useQuery({
        queryKey: ['fetchAllTodos'],
        queryFn: fetchAllTodos,
      });
    
    // console.log(todoItems)
    
    const handleClick = (e: any, id: number) => {
      e.preventDefault()
      router.push(`/${id}`)
    }

    return (
        <ul className="divide-y divide-gray-300">
            {isLoading ? <><Spinner /><Spinner /><Spinner /><Spinner /></> :
              todoItems?.map((item: TodoItemType) => (
                <li className="p-4 mb-2 hover:bg-white shadow rounded-lg cursor-pointer" key={`${item.id}`} onClick={(e) => handleClick(e, item.id)}>
                  <div className="flex items-center space-x-4">
                    {/* <img src="https://via.placeholder.com/50" alt="Placeholder" className="w-12 h-12 rounded-full"> */}
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-sm text-gray-500">Data de edição: {dateFormat(item.updated_at)}</p>
                      <p className="text-sm text-gray-500">Data de criação: {dateFormat(item.created_at)}</p>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
    )
}