import { useState } from "react"
import { MdDelete, MdEdit, MdSave, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import { ITodo } from "../libs/interfaces"

const Todo = ({
    todo,
    deleteTodo,
    editTodo
}: {
    todo: ITodo
    deleteTodo: (id: string) => void
    editTodo: (todo: ITodo) => void
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(todo.content)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value)
    }
    const handleSave = () => {
        if (isEditing) {
            editTodo({ ...todo, content: editValue })
        }
        setIsEditing(!isEditing)
    }
    return (
        <li key={todo.id} className='flex p-1 items-center gap-2 bg-gray-800 rounded-lg'>
            <button onClick={() => editTodo({ ...todo, isDone: !todo.isDone })} className='rounded-lg cursor-pointer ml-2'>
                {
                    todo.isDone ?
                        <MdCheckBox className="text-blue-500" size={36} /> :
                        <MdCheckBoxOutlineBlank className="text-blue-500" size={36} />
                }
            </button>
            {
                isEditing ?
                    <input autoFocus className="p-3 w-full focus:outline-0 text-lg" value={editValue} onChange={handleChange} /> :
                    <span className="p-3 text-lg">{
                        todo.isDone ?
                            <del>{todo.content}</del> :
                            todo.content
                    }</span>
            }
            <button onClick={handleSave} className='bg-blue-500 p-2 rounded-lg ml-auto cursor-pointer hover:bg-blue-400'>
                {isEditing ? <MdSave size={32} /> : <MdEdit size={32} />}
            </button>
            <button onClick={() => deleteTodo(todo.id)} className='bg-red-500 p-2 rounded-lg cursor-pointer hover:bg-red-400'><MdDelete size={32} /></button>
        </li>
    )
}

export default Todo