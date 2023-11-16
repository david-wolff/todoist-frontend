import { todoItemsMock } from '@/mocks/todoItems'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-lg mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">TODOIST frontend</h1>
        </header>
        <ul className="divide-y divide-gray-300">
          {
            todoItemsMock.map(item => (
              <li className="py-4" key={`${item.id}`}>
                <div className="flex items-center space-x-4">
                  {/* <img src="https://via.placeholder.com/50" alt="Placeholder" className="w-12 h-12 rounded-full"> */}
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-sm text-gray-500">Updated: {item.updated_at}</p>
                    <p className="text-sm text-gray-500">Created: {item.created_at}</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </main>
  )
}
