import { useState } from "react"
import { useTasks } from "../libs/contexts/TaskContext"
import { MdAdd } from "react-icons/md"

const CreateTask = () => {
    const { addTask } = useTasks()
    const [task, setTask] = useState('')
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (task.trim() === '') return
        addTask(task)
        setTask('')
    }
    return (
        <form className="flex items-center space-x-2 bg-[#282828] p-4 rounded-lg w-full max-w-[720px]" onSubmit={handleSubmit}>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} className="bg-[#282828] text-white border-none focus:outline-none w-full" placeholder="task" />
            <button type="submit" className="p-2 rounded-lg cursor-pointer"><MdAdd size={24} /></button>
        </form >
    )
}

export default CreateTask