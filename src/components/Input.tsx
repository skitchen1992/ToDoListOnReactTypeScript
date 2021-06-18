import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import '../App.css';

type InputType = {
    addTask: (newTitle: string) => void
}

const Input = (props: InputType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<null | string>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title)
            setTitle('')
        }else {
            setError('Title is required')
        }
        setTitle('')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    return (
        <div>
            <input className={error ? 'error' : ''} onChange={onChangeHandler} value={title}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
};

export default Input;