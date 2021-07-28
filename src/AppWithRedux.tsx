import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
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

    function removeTask(taskId: string, todolistId: string) {
        dispatch (removeTaskAC(taskId, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatch (addTaskAC(title, todolistId))
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch (changeTaskStatusAC(taskId, isDone, todolistId))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch (changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatch (changeFilterAC(value, todolistId))
    }

    function removeTodolist(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatch (action)

    }

    function changeTodolistTitle(id: string, title: string) {
        dispatch (changeTodolistTitleAC(title, id))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch (action)

    }

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
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
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
