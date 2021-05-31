import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    const tasks1 = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false }
    ];

    const tasks2 = [
        { id: 1, title: 'Hello world', isDone: true },
        { id: 2, title: 'I am happy', isDone: true },
        { id: 3, title: 'Yo', isDone: false }
    ]
    return (
        <div>
            <Todolist title={'What to learn'} tasks = {tasks1}/>
            <Todolist title={'What to at school'} tasks = {tasks2}/>
            <Todolist title={'What to at university'} tasks = {tasks1}/>
        </div>
    );
}

export default App;
