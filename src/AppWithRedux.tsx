import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TasksStateType} from "./App";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = useCallback((taskId: string, todolistId: string)=> {
        dispatch (removeTaskAC(taskId, todolistId))
    },[dispatch])

    const addTask = useCallback((title: string, todolistId: string)=> {
        dispatch (addTaskAC(title, todolistId))
    },[dispatch])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string)=> {
        dispatch (changeTaskStatusAC(taskId, isDone, todolistId))
    },[dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string)=> {
        dispatch (changeTaskTitleAC(taskId, newTitle, todolistId))
    },[dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string)=> {
        dispatch (changeFilterAC(value, todolistId))
    },[dispatch ])

    const removeTodolist = useCallback((todoListID: string)=> {
        const action = removeTodoListAC(todoListID)
        dispatch (action)

    },[dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string)=> {
        dispatch (changeTodolistTitleAC(title, id))
    },[dispatch])

    const addTodolist = useCallback((title: string) =>{
        const action = addTodolistAC(title)
        dispatch (action)
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TaskManager
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
