import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {TextField, Select, Button, Typography, MenuItem, Stack, Container} from '@mui/material';
import {categoryOptions, priorityOptions, statusOptions, type Task} from '../utils/task';

interface TaskDetailsProps {
    tasks: Task[];
    onSave: (task: Task) => void;
}

const TaskDetails = ({tasks, onSave}:TaskDetailsProps) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const originalTask = tasks.find(t => t.id === Number(id));

    const [formData, setFormData] = useState<Task | undefined>(originalTask);

    if (!formData) return <Typography>Задача не найдена</Typography>;

    const handleChange = (field: keyof Task) => (e: any) => {
        setFormData(prev => prev ? { ...prev, [field]: e.target.value } : prev);
    };

    const handleSave = () => {
        if (formData) {
            onSave(formData);
            navigate('/');
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>Редактировать задачу</Typography>
            <Stack spacing={2}>
                <TextField label="Заголовок" value={formData.title} onChange={handleChange('title')} fullWidth />
                <TextField label="Описание" value={formData.description || ''} onChange={handleChange('description')} fullWidth multiline rows={3} />

                <Select value={formData.category} onChange={handleChange('category')} fullWidth>
                    {categoryOptions.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>

                <Select value={formData.status} onChange={handleChange('status')} fullWidth>
                    {statusOptions.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>

                <Select value={formData.priority} onChange={handleChange('priority')} fullWidth>
                    {priorityOptions.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                </Select>

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleSave}>Сохранить</Button>
                    <Button variant="outlined" onClick={() => navigate('/')}>Отмена</Button>
                </Stack>
            </Stack>
        </Container>
    );
};
export default TaskDetails;