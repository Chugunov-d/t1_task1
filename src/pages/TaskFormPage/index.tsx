// src/pages/TaskFormPage/index.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/store';
import type {RootState} from '../../app/store';
import {
    type ITask,
    addTask,
    updateTask,
    categoryOptions, statusOptions, priorityOptions
} from '../../features/cardSlice';
import { Box, TextField, Button, Container, Typography, MenuItem, Stack } from '@mui/material';

const TaskFormPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isEditing = Boolean(id);

    const taskToEdit = useSelector((state: RootState) =>
        state.tasks.tasks.find(task => task.id === id)
    );

    const [formState, setFormState] = useState<Omit<ITask, 'id' | 'createdAt'>>({
        title: '',
        description: '',
        category: 'Feature',
        status: 'To Do',
        priority: 'Medium',
    });

    useEffect(() => {
        if (isEditing && taskToEdit) {
            setFormState(taskToEdit);
        }
    }, [isEditing, taskToEdit]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isEditing && id) {
            dispatch(updateTask({ ...formState, id, createdAt: taskToEdit!.createdAt }));
        } else {
            dispatch(addTask(formState));
        }
        navigate('/');
    };



    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {isEditing ? 'Редактировать задачу' : 'Создать задачу'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Заголовок"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="description"
                        label="Описание"
                        name="description"
                        multiline
                        rows={4}
                        value={formState.description}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        margin="normal"
                        fullWidth
                        name="category"
                        label="Категория"
                        value={formState.category}
                        onChange={handleChange}
                    >
                        {categoryOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    </TextField>
                    <TextField
                        select
                        margin="normal"
                        fullWidth
                        name="status"
                        label="Статус"
                        value={formState.status}
                        onChange={handleChange}
                    >
                        {statusOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    </TextField>
                    <TextField
                        select
                        margin="normal"
                        fullWidth
                        name="priority"
                        label="Приоритет"
                        value={formState.priority}
                        onChange={handleChange}
                    >
                        {priorityOptions.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                    </TextField>
                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                        <Button type="submit" fullWidth variant="contained">
                            Сохранить
                        </Button>
                        <Button fullWidth variant="outlined" onClick={() => navigate('/')}>
                            Отмена
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default TaskFormPage;