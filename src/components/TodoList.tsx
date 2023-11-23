'use client'
import {
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import { TodoItemType } from '@/type/todoItem'
import Spinner from './Spinner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const fetchAllTodos = async (page: number, todoItems: number) => {
  try {
    const { data } = await axios.get(`http://localhost:8000/todoitem/list?page=${page}&total_items=${todoItems}`)

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

  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(10)

  const { data: todoItems, isLoading, refetch } = useQuery({
    queryKey: ['fetchAllTodos'],
    queryFn: () => fetchAllTodos(page, totalItems),
  });

  useEffect(() => {
    refetch()
  }, [page])

  useEffect(() => {
    refetch()
    setPage(1)
  }, [totalItems])

  const handleClick = (e: any, id: number) => {
    e.preventDefault()
    router.push(`/${id}`)
  }

  return (
    <>
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
      <div className="flex items-stretch mt-12">
        <a
          onClick={() => setPage(cur => cur > 1 ? cur - 1 : 1)}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
        >
          Previous
        </a>
        <a
          onClick={() => setPage(cur => cur + 1)}
          className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
        >
          Next
        </a>
        <select
          id="totalItems"
          onChange={e => setTotalItems(parseInt(e.target.value))}
          value={totalItems}
          defaultValue={totalItems}
          className="ms-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
    </>
  )
}