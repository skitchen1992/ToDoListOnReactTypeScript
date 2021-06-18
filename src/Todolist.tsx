import React, {ChangeEvent} from "react";
import {KeyType} from "./App";
import {Button} from "./components/Button";

import Input from "./components/Input";

type propsType = {
    title: string,
    tasks: Array<inArray>
    removeTask: (id: string) => void
    changeFilter: (key: KeyType) => void
    addTask: (newTitle: string) => void
    onChangeStatus: (id: string, isDone: boolean) => void
    filter: KeyType
}
export type inArray = {
    id: string,
    title: string,
    isDone: boolean,

}

export const Todolist = (props: propsType) => {
    /*    const changeFilterHandlerAll = () => props.changeFilter('All')
        const changeFilterHandlerActive = () => props.changeFilter('Active')
        const changeFilterHandlerCompleted = () => props.changeFilter('Completed')*/


    const onFilterClickHandler = (str: KeyType) => {
        props.changeFilter(str)
    }
    const filter:KeyType[] = ['All','Active','Completed']

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <Input addTask={(newTitle: string) => props.addTask(newTitle)}/>
                </div>
                <ul>
                    {props.tasks.map(t => {
                            const removeTask = () => props.removeTask(t.id)
                            const onChangeDone = (e: ChangeEvent<HTMLInputElement>) => props.onChangeStatus(t.id, e.currentTarget.checked)
                            return (
                                <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                    <button onClick={removeTask}>X</button>
                                    <input onChange={onChangeDone} type="checkbox" checked={t.isDone}/>
                                    <span>{t.title}</span>
                                </li>
                            )
                        }
                    )
                    }
                </ul>
                <div>
                    {/*                    <Button filter={props.filter} callBack={changeFilterHandlerAll} value={'All'}/>
                    <Button filter={props.filter} callBack={changeFilterHandlerActive} value={'Active'}/>
                    <Button filter={props.filter} callBack={changeFilterHandlerCompleted} value={'Completed'}/>*/}
                    {filter.map(el=>{
                      return  <Button filter={props.filter} onFilterClickHandler={onFilterClickHandler} value={el}/>
                    })}
                    {/*<Button filter={props.filter} onFilterClickHandler={onFilterClickHandler} value={'All'}/>*/}
                    {/*<Button filter={props.filter} onFilterClickHandler={onFilterClickHandler} value={'Active'}/>*/}
                    {/*<Button filter={props.filter} onFilterClickHandler={onFilterClickHandler} value={'Completed'}/>*/}
                </div>
            </div>
        </div>
    )
}