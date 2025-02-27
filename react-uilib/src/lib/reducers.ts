import { IFilterState, IFilterAction } from "./interfaces";

export const filterReducer = (state: IFilterState, action: IFilterAction): IFilterState => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.payload as string
            }
        case 'SET_SORT':
            return {
                ...state,
                sort: action.payload as 'asc' | 'desc' | ''
            }
        case 'SET_LIMIT':
            return {
                ...state,
                limit: action.payload as number
            }
        default:
            return state
    }
}