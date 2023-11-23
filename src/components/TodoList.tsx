'use client'
import {
  useQuery,
} from '@tanstack/react-query'
import axios from 'axios'
import { TodoItemType } from '@/type/todoItem'
import Spinner from './Spinner'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const fetchAllTodos = async (page: number, totalItems: number, filterByDone?: boolean) => {
  try {
    const params = {
      page,
      total_items: totalItems,
      filter_by_done: filterByDone
    }
    const { data } = await axios.get('http://localhost:8000/todoitem/list', { params })

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
  const [filterByDone, setFilterByDone] = useState<boolean | undefined>(undefined)

  const { data: todoItems, isLoading, refetch } = useQuery({
    queryKey: ['fetchAllTodos'],
    queryFn: () => fetchAllTodos(page, totalItems, filterByDone),
  });

  useEffect(() => {
    refetch()
  }, [page])

  useEffect(() => {
    refetch()
    setPage(1)
  }, [totalItems, filterByDone])

  const handleClick = (e: any, id: number) => {
    e.preventDefault()
    router.push(`/${id}`)
  }

  const handleChange = (e: any) => {
    let filterBy = undefined
    if (e.target.value === "done") {
      filterBy = true
    } else if (e.target.value === "undone") {
      filterBy = false
    }

    setFilterByDone(filterBy)
  }

  const filterValue = () => {
    if (filterByDone) {
      return "done"
    } else if (typeof filterByDone == 'undefined') {
      return "all"
    }
    return "undone"
  }

  console.log(filterByDone)

  return (
    <>
      <select
        id="orderByDone"
        onChange={handleChange}
        value={filterValue()}
        className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="all">Todos</option>
        <option value="done">Feitos</option>
        <option value="undone">Não feitos</option>
      </select>
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
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z" />
                  </svg>
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