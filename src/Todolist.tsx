import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    reNameTask: (newValue: string, taskId: string, todoListID: string) => void
    reNameTodolist: (newValue: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {


    const addTask = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }


    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const reNameTodolist = (newTitle: string) => {
        props.reNameTodolist(newTitle, props.id)
    }

    return <div>
        <h3>
            <EditMode title={props.title} onChange={reNameTodolist}/>

            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const reNameTask = (newValue: string) => {
                        props.reNameTask(newValue, t.id, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditMode title={t.title} onChange={reNameTask}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

type EditModeType = {
    title: string
    onChange: (newValue: string) => void
}

function EditMode(props: EditModeType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(true)
    }
    const onViewMode = () => {
        setEditMode(false)
        props.onChange(value)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        editMode ?
            <input value={value} onBlur={onViewMode} autoFocus onChange={changeTitle}/> :
            <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

