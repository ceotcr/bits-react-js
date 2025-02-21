export interface ITask {
    id: number;
    title: string;
    done: boolean;
}

export type TaskReducerActionType =
    | { type: "ADD_TASK"; params: string }
    | { type: "DELETE_TASK"; params: number }
    | { type: "TOGGLE_STATUS"; params: number };
