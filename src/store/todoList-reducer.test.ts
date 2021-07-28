import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';
import {
    addTodolistAC, changeFilterAC,
    ChangeFilter,
    changeTodolistTitleAC,
    ChangeTodolistTitle,
    removeTodoListAC,
    todolistsReducer
} from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let state: Array<TodolistType>

beforeEach(()=>{
     todolistId1 = v1();
     todolistId2 = v1();
     state = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

})


test('correct todolist should be removed', () => {


    const endState = todolistsReducer(state, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe("What to buy");
});
test('correct todolist should be added', () => {


    let newTodolistTitle = "New Todolist";


    const endState = todolistsReducer(state, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";


    const action: ChangeTodolistTitle = {
        type: "CHANGE-TODOLIST-TITLE",
        title: newTodolistTitle,
        id: todolistId2,

    };

    const endState = todolistsReducer(state, changeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValuesType = "completed";



    const action: ChangeFilter = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        value: newFilter
    };

    const endState = todolistsReducer(state, changeFilterAC(newFilter,todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
