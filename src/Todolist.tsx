import React from "react";
import {KeyType} from "./App";

type propsType={
    title:string,
    tasks:Array<inArray>
    removeTask:(id:string)=>void
    changeFilter:(key: KeyType )=>void
}
export type inArray ={
    id: string,
    title:string,
    isDone:boolean,

}

export const Todolist=(props:propsType)=>{
    return(
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map(el=><li key={el.id}>
                        <button onClick={()=>props.removeTask(el.id)}>X</button>
                        <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>)}
                </ul>
                <div>
                    <button onClick={()=>props.changeFilter('All')}>All</button>
                    <button onClick={()=>props.changeFilter('Active')}>Active</button>
                    <button onClick={()=>props.changeFilter('Completed')}>Completed</button>
                </div>
            </div>
        </div>
    )
}