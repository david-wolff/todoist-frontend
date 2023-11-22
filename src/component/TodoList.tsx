'use client'
import {
    useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import { TodoItemType } from '@/type/todoItem'
import Spinner from './Spinner'


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
    const { data: todoItems, isLoading } = useQuery({
        queryKey: ['fetchAllTodos'],
        queryFn: fetchAllTodos,
      });
    
    // console.log(todoItems)
    
    return (
        <ul className="divide-y divide-gray-300">
            { isLoading ? <Spinner /> :
              todoItems?.map((item: TodoItemType) => (
                <li className="py-4" key={`${item.id}`}>
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