import React from "react";

type ProsType ={
    callBack:()=>void
    value:string

}
export const Button=(props:ProsType)=>{
    const onClickHandler=()=>props.callBack()
    return(
        <button onClick={onClickHandler}>{props.value}</button>
    )
}