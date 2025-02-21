import CreateTask from "./components/CreateTask"
import Tasks from "./components/Tasks"
import { TaskContextProvider } from "./libs/contexts/TaskContext"

function App() {
  return (
    <main className="w-full max-w-[1440px] mx-auto flex flex-col p-4 items-center gap-4">
      <TaskContextProvider>
        <CreateTask />
        <Tasks />
      </TaskContextProvider>
    </main>
  )
}

export default App
