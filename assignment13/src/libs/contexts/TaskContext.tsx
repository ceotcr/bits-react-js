import React, { useCallback, useReducer } from "react";
import { ITask } from "../types/Tasks";
import { taskReducer } from "../reducers/TaskReducer";

type TaskContextType = {
    tasks: ITask[];
    addTask: (params: string) => void;
    removeTask: (params: number) => void;
    toggleTask: (params: number) => void;
}

const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

export const TaskContextProvider = ({ children }: {
    children: React.ReactNode;
}) => {
    const [tasks, taskDispatch] = useReducer(taskReducer, []);
    const addTask = useCallback((params: string) => taskDispatch({ type: 'ADD_TASK', params }), []);
    const removeTask = useCallback((params: number) => taskDispatch({ type: 'DELETE_TASK', params }), []);
    const toggleTask = useCallback((params: number) => taskDispatch({ type: 'TOGGLE_STATUS', params }), []);
    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask }}>
            {children}
        </TaskContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
    const context = React.useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskContextProvider');
    }
    return context;
}