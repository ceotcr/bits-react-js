import { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { ITodo } from '../libs/interfaces'
import { v7 as uuid } from 'uuid'
const CreateTodo = (
    { setTodos }: { setTodos: React.Dispatch<React.SetStateAction<ITodo[]>> }
) => {
    const [todo, setTodo] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (todo.trim() === '') return
        const id = uuid()
        setTodos((prev) => [...prev, { id, content: todo, isDone: false }])
        setTodo('')
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex bg-gray-800 max-w-[720px] rounded-lg text-white'>
            <input type='text' autoFocus className='w-full p-4 focus:border-blue-500 focus:outline-0 border-r-0 border-2 border-slate-600 rounded-l-lg' placeholder='Create a new todo...' value={todo} onChange={handleChange} />
            <button type='submit' className='bg-blue-500 p-4 rounded-r-lg cursor-pointer hover:bg-blue-400'><MdAdd size={24} /></button>
        </form>
    )
}

export default CreateTodo