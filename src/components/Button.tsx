import React from "react";
import {KeyType} from "../App";



type ProsType ={
    onFilterClickHandler:(str:KeyType ) =>void
    value:KeyType
    filter:KeyType



}
export const Button=(props:ProsType)=>{
    const onClickHandler=()=>props.onFilterClickHandler(props.value)
    return(
        <button className={props.filter === props.value?'active-filter':''} onClick={onClickHandler}>{props.value}</button>
    )
}

