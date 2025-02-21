import { ITask } from "../interfaces/Tasks";

type ActionType =
    | { type: "ADD_TASK"; params: string }
    | { type: "DELETE_TASK"; params: number }
    | { type: "TOGGLE_STATUS"; params: number };

export const taskReducer = (state: ITask[], action: ActionType) => {
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