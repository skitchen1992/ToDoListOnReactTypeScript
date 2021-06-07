import React from "react";
import {KeyType} from "./App";
import {Button} from "./components/Button";

import Input from "./components/Input";

type propsType = {
    title: string,
    tasks: Array<inArray>
    removeTask: (id: string) => void
    changeFilter: (key: KeyType) => void
    addTask:(newTitle:string)=>void
}
export type inArray = {
    id: string,
    title: string,
    isDone: boolean,


}

export const Todolist = (props: propsType) => {
    const changeFilterHandlerAll = () => props.changeFilter('All')
    const changeFilterHandlerActive = () => props.changeFilter('Active')
    const changeFilterHandlerCompleted = () => props.changeFilter('Completed')

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <Input callBack={(newTitle:string)=>props.addTask(newTitle)} />
                </div>
                <ul>
                    {props.tasks.map(t => {
                        const removeTask =()=>props.removeTask(t.id)
                            return (
                                <li key={t.id}>
                                    <Button callBack={removeTask} value={'X'}/>
                                    <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                                </li>
                            )
                        }
                    )
                    }
                </ul>
                <div>
                    <Button callBack={changeFilterHandlerAll} value={'All'}/>
                    <Button callBack={changeFilterHandlerActive} value={'Active'}/>
                    <Button callBack={changeFilterHandlerCompleted} value={'Completed'}/>
                </div>
            </div>
        </div>
    )
}