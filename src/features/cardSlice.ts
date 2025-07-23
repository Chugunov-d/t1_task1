import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
}

// Загружаем начальное состояние из localStorage
const initialState: TasksState = {
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // Редьюсер для создания задачи
        createTask: (state, action: PayloadAction<Omit<ITask, 'id' | 'createdAt'>>) => {
            const newTask: ITask = {
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                ...action.payload,
            };
            state.tasks.push(newTask);
        },
        // Редьюсер для обновления задачи
        updateTask: (state, action: PayloadAction<ITask>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        // Редьюсер для удаления задачи
        deleteTask: (state, action: PayloadAction<string>) => { // payload - это id задачи
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
    },
});

export const { createTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;