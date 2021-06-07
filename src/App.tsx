import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {inArray, Todolist} from "./Todolist";
import {v1} from "uuid";

export type KeyType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTask] = useState<Array<inArray>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ])

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        setTask([newTask, ...tasks])
    }

    let [filter, setFilter] = useState<KeyType>('All')

    const removeTask = (id: string) => {
        tasks = tasks.filter(el => el.id !== id)
        setTask(tasks)
    }

    const changeFilter = (key: KeyType) => {
        setFilter(key)
    }
    let filterValue = tasks

    if (filter === 'Active') {
        filterValue = (tasks.filter(el => !el.isDone))
    }
    if (filter === 'Completed') {
        filterValue = (tasks.filter(el => el.isDone))
    }


    return (
        <div>
            <Todolist title={'What to learn'}
                      tasks={filterValue}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
