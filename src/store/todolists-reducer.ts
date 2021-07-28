import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodoList = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolist = {
    type: "ADD-TODOLIST"
    title: string
    todolistId:string
}
export type ChangeTodolistTitle = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string
}


export type ChangeFilter = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType,
    id: string
}

type ActionType = RemoveTodoList | AddTodolist | ChangeTodolistTitle | ChangeFilter

export const removeTodoListAC = (todoListID: string): RemoveTodoList => {
    return {type: "REMOVE-TODOLIST", id: todoListID}
}
export const addTodolistAC = (newTitleTodo: string): AddTodolist => {
    return {type: "ADD-TODOLIST", title: newTitleTodo, todolistId:v1()}
}
export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitle => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}
}
export const changeFilterAC = (value: FilterValuesType, id: string): ChangeFilter => {
    return {type: "CHANGE-TODOLIST-FILTER", value: value, id: id}
}

const initialState:TodolistType[]= []

export const todolistsReducer = (state: TodolistType[]=initialState, action: ActionType):TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id != action.id)
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId, title: action.title, filter: 'all'}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.value} : tl)

    }
    return state
}