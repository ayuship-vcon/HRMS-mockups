import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        role: "user", // default role
        todos: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(item => item.id !== action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(item => item.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    }
})
export const { addTodo, deleteTodo, toggleTodo, setRole } = userSlice.actions
export default userSlice.reducer