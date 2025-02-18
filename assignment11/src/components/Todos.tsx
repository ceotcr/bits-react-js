import { ITodo } from "../libs/interfaces";
import Todo from "./Todo";

const Todos = (
    { todos, setTodos }: { todos: ITodo[]; setTodos: React.Dispatch<React.SetStateAction<ITodo[]>> }
) => {
    const deleteTodo = (id: string) => {
        const newTodos = todos.filter((t) => t.id !== id)
        setTodos(newTodos)
    }
    const editTodo = (todo: ITodo) => {
        const newTodos = todos.map((t) => t.id === todo.id ? todo : t)
        setTodos(newTodos)
    }
    return (
        <ul className='w-full flex flex-col gap-2 max-w-[720px] rounded-lg text-white'>
            {
                todos.filter(
                    (todo) => !todo.isDone
                ).length === 0 ?
                    <div className="w-full p-4 flex items-center justify-center ">Try creating a todo</div>
                    :
                    todos.filter((todo) => !todo.isDone).map((todo) => (
                        <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />
                    ))
            }
            <hr className='w-full border-gray-600 my-4' />
            {
                todos.filter(
                    (todo) => todo.isDone
                ).length === 0 ?
                    <div className="w-full p-4 flex items-center justify-center ">Mark a todo as done</div>
                    :
                    [
                        <div key='done' className="w-full text-lg flex items-center justify-between">
                            <span>Completed</span>
                            <button onClick={() => setTodos(todos.filter((todo) => !todo.isDone))} className='bg-red-500 p-2 px-4 text-sm rounded-lg cursor-pointer hover:bg-red-400'>Clear all</button>
                        </div>,
                        todos.filter((todo) => todo.isDone).map((todo) => (
                            <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />
                        ))
                    ]
            }
        </ul >
    )
}

export default Todos