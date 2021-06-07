import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputType = {
    callBack: (newTitle: string) => void
}

const Input = (props: InputType) => {

    let [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickHandler = () => {
        props.callBack(title)
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }
    return (
        <div>
            <input onChange={onChangeHandler} value={title} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickHandler}>+</button>
        </div>
    );
};

export default Input;