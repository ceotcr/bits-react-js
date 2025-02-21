import { MdDelete } from "react-icons/md"
import { useTasks } from "../libs/contexts/TaskContext"
import { useMemo } from "react";

const Tasks = () => {
    const { tasks, removeTask, toggleTask } = useTasks()
    const completedTasksCount = useMemo(() => {
        return tasks.filter((task) => task.done).length;
    }, [tasks]);

    const filteredTasks = useMemo(() => {
        return tasks.sort((a, b) => Number(a.done) - Number(b.done));
    }, [tasks]);

    return (
        <>
            <div className="flex items-end justify-between w-full max-w-[720px]">
                <h1 className="text-xl font-bold text-white">Tasks</h1>
                <p className="text-white">Completed: {completedTasksCount}</p>
            </div>
            <div className="flex flex-col items-center space-y-4 w-full max-w-[720px]">
                {filteredTasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between bg-[#282828] p-4 rounded-lg w-full max-w-[720px]">
                        <div className="flex items-center gap-4">
                            <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} className="cursor-pointer w-4 h-4" />
                            <p className={task.done ? 'line-through' : '' + " text-lg"}>{task.title}</p>
                        </div>
                        <button className="p-2 cursor-pointer text-red-300 hover:text-red-400" onClick={() => removeTask(task.id)}><MdDelete size={24} /></button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Tasks