import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    role: "user",

    // Hardcoded permissions for testing PBAC
    permissions: [
      "dashboard.view",
      "user.view",
      "user.create",
      "employee.profile.view",
      "report.view",
      "chart.view",
      "radar-chart.view",
      "horizontal.view",
      "vertical.view",
    ],

    todos: [],
  },

  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },

    setRole: (state, action) => {
      state.role = action.payload;
    },

    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (item) => item.id !== action.payload
      );
    },

    toggleTodo: (state, action) => {
      const todo = state.todos.find(
        (item) => item.id === action.payload
      );

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodo,
  setRole,
  setPermissions,
} = userSlice.actions;

export default userSlice.reducer;