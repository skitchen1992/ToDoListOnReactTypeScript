import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolist, RemoveTodoList} from "./todolists-reducer";


export type removeTask = {
    type: "REMOVE_TASK",
    taskId: string,
    todoListId: string,

}
export type SecondActionType = {
    type: "ADD_TASK"
    title: string,
    todoListId: string

}
export type ChangeTaskStatusType = {
    type: "CHANGE_TASK_STATUS"
    taskId: string,
    isDone: boolean,
    todoListId: string

}

export type ChangeTaskTitleType = {
    type: "CHANGE_TASK_TITLE"
    taskId: string,
    newTitle: string,
    todoListId: string

}

type ActionType = removeTask | SecondActionType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodolist | RemoveTodoList

export const removeTaskAC = (taskId: string, todoListId: string): removeTask => {
    return {type: "REMOVE_TASK", taskId, todoListId}
}
export const addTaskAC = (title: string, todoListId: string): SecondActionType => {
    return {type: "ADD_TASK", title, todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusType => {
    return {type: "CHANGE_TASK_STATUS", taskId, isDone, todoListId}
}

export const changeTaskTitleAC = (taskId: string,  newTitle: string, todoListId: string): ChangeTaskTitleType => {
    return {type: "CHANGE_TASK_TITLE", taskId, newTitle, todoListId}
}


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE_TASK": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id != action.taskId)
            }
        }
        case "ADD_TASK": {
            const newTask = {id: action.todoListId, title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        }
        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t),
            }
        }
        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t),
            }
        }
        case "ADD-TODOLIST": {
            return {...state,[action.todolistId]:[]}
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}