import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoAPI } from "../../api";

// the outside "thunk creator" function
export const fetchTodos = createAsyncThunk("todos/fetchAll", () =>
  todoAPI.fetchAll()
);
export const deleteTodo = createAsyncThunk("todo/delete", (id) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  return todoAPI.deleteOne(id);
});
export const updateTodo = createAsyncThunk("todo/update", (payload) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  return todoAPI.updateOne(payload);
});
export const addTodo = createAsyncThunk("todo/add", async (todo) => {
  // TODO: return a call  to corresponding API method i.e. todoAPI.fetchAll()
  const newTodo = { ...todo, state: "new" };
  return todoAPI.createOne(newTodo);
});

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.meta.arg);
      if (index !== -1) state.splice(index, 1);
    });

    builder.addCase(addTodo.fulfilled, (state, action) => {
      // TODO: Finish the code for adding todo
      state.push(action.payload);
    });

    builder.addCase(updateTodo.fulfilled, (state, action) => {
      // TODO: Finish the code for updating todo
      const updatedTodo = action.payload;
      const index = state.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state[index] = updatedTodo;
      }
    });
  },
});

export default todosSlice.reducer;
