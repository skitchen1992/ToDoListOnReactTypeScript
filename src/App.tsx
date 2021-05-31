import React, {useState} from 'react';
import './App.css';
import {inArray, Todolist} from "./Todolist";

export type KeyType = 'All'| 'Active'| 'Completed'

function App() {
    /*    let tasks1 = [
            { id: 1, title: 'HTML&CSS', isDone: true },
            { id: 2, title: 'JS', isDone: true },
            { id: 3, title: 'ReactJS', isDone: false },
            { id: 4, title: 'HTML&CSS', isDone: true },
            { id: 5, title: 'JS', isDone: true },
            { id: 6, title: 'ReactJS', isDone: false }
        ];*/

    let [tasks, setTask] = useState<Array<inArray>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'HTML&CSS', isDone: true},
        {id: 5, title: 'JS', isDone: true},
        {id: 6, title: 'ReactJS', isDone: false}
    ])
    let[filter,setFilter] = useState<KeyType>('All')

    const removeTask = (id: number) => {
        tasks = tasks.filter(el => el.id !== id)
        setTask(tasks )
    }

    const changeFilter = (key:KeyType)=>{
        setFilter(key)
    }
    let filterValue = tasks

    if(filter ==='Active'){
        filterValue =(tasks.filter(el=>!el.isDone))
    }
    if(filter==='Completed'){
        filterValue =(tasks.filter(el=>el.isDone))
    }


    return (
        <div>
            <Todolist title={'What to learn'} tasks={filterValue} removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
