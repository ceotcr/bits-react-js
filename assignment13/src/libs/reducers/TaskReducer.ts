import { TaskReducerActionType, ITask } from "../types/Tasks";

export const taskReducer = (state: ITask[], action: TaskReducerActionType) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, { id: Date.now(), title: action.params, done: false }];
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.params);
        case 'TOGGLE_STATUS':
            return state.map(task => task.id === action.params ? { ...task, done: !task.done } : task);
        default:
            return state;
    }
}