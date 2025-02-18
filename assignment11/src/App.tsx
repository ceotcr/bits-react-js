import { useEffect, useState } from "react"
import CreateTodo from "./components/CreateTodo"
import Todos from "./components/Todos"
import { ITodo } from "./libs/interfaces"

function App() {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
      const data = localStorage.getItem('todos')
      if (data) {
        setTodos(JSON.parse(data))
      }
      setIsLoaded(true)
    }
    else {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos, isLoaded])

  useEffect(() => {
    const pending = todos.filter((todo) => !todo.isDone).length
    if (pending === 0) document.title = 'Todo App'
    else document.title = `${pending} task${pending > 1 ? "s" : ""} pending`
  }, [todos])
  return (
    <main className="flex flex-col items-center max-w-[1440px] mx-auto gap-4 min-h-screen pt-32">
      <CreateTodo setTodos={setTodos} />
      <Todos todos={todos} setTodos={setTodos} />
    </main>
  )
}

export default App
