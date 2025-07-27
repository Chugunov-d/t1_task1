import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type TaskCategory = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
export const priorityOptions: TaskPriority[] = ['Low', 'Medium', 'High'];
export const categoryOptions: TaskCategory[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];

export interface ITask {
    id: string;
    title: string;
    description?: string;
    category: TaskCategory;
    status: TaskStatus;
    priority: TaskPriority;
    createdAt: string; // ISO string format
}

interface TasksState {
    tasks: ITask[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
const initialState: TasksState = {
    tasks: [],
    status: 'idle',
    error: null,
};

const API_BASE_URL = 'http://localhost:3000';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get<ITask[]>(`${API_BASE_URL}/tasks`);
    return response.data;
});

export const addTask = createAsyncThunk(
    'tasks/addNewTask',
    async (taskData: Omit<ITask, 'id' | 'createdAt'>) => {
        const response = await axios.post<ITask>(`${API_BASE_URL}/tasks`, taskData);
        return response.data;
    }
);

export const updateTask = createAsyncThunk(
    'tasks/updateExistingTask',
    async (task: ITask) => {
        const response = await axios.put<ITask>(`${API_BASE_URL}/tasks/${task.id}`, task);
        return response.data;
    }
);
export const deleteTask = createAsyncThunk(
    'tasks/deleteExistingTask',
    async (taskId: string) => {
        await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
        return taskId; // Возвращаем ID для удаления из стейта
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<ITask[]>) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch tasks';
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<ITask>) => {
                state.tasks.unshift(action.payload); // Добавляем новую задачу в начало списка
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            // Delete Task
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            });
    }
});

export default taskSlice.reducer;