import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Thunks for API calls
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], loading: false },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.slice(0, 10); // Limiting tasks for simplicity
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      });
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
