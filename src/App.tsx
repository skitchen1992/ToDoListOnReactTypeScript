import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    todoListsId: string,
    title: string,
    filter: FilterValuesType
}


function App() {


    const todoList1 = v1()
    const todoList2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListsType[]>([
        {todoListsId: todoList1, title: 'What to learn', filter: "all"},
        {todoListsId: todoList2, title: 'What to read', filter: "all"}
    ])
    const [tasks, setTasks] = useState({
        [todoList1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoList2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
    })



    function removeTask(id: string, todoListsId: string) {
        setTasks(obj => ({
            ...obj,
            [todoListsId]: [...obj[todoListsId].filter(el => {
                return el.id !== id
            })]
        }))


    }
    function addTask(title: string, todoListsId: string) {
        setTasks(obj => ({
            ...obj,
            [todoListsId]: [...obj[todoListsId], {id: v1(), title: title, isDone: false}]
        }))

    }
    function changeStatus(taskId: string, isDone: boolean, todoListsId: string) {
        setTasks(obj => ({
            ...obj,
            [todoListsId]: obj[todoListsId].map(t => t.id === taskId ? {...t, isDone} : t)
        }))


    }
    function changeFilter(value: FilterValuesType, todoListsId: string) {
        setTodoLists(list =>
            list.map(l => {
                return l.todoListsId === todoListsId ? {...l, filter: value} : l
            }));
    }
    function removeTodoList(todoListsId: string){
        setTodoLists(todoLists=>
            todoLists.filter(td=>{
               return td.todoListsId!==todoListsId
            })
        )
        delete tasks[todoListsId]
        setTasks({...tasks})

    }


    return (
        <div className="App">
            {todoLists.map(td => {
                let tasksForTodolist = tasks[td.todoListsId] || [];
                if (td.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (td.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                return <Todolist
                    key={td.todoListsId}
                    title={td.title}
                    todoListsId={td.todoListsId}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={td.filter}
                    removeTodoList={removeTodoList}
                />
            })}
        </div>
    );
}

export default App;





