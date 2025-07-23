import {type ITask, deleteTask } from '../../../features/cardSlice';
import { Card, CardContent, Typography, Chip, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store';

interface TaskItemProps {
    task: ITask;
}

const statusColors: { [key: string]: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" } = {
    'To Do': 'error',
    'In Progress': 'warning',
    'Done': 'success'
};

export const TaskItem = ({ task }: TaskItemProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Предотвращаем переход на страницу редактирования
        dispatch(deleteTask(task.id));
    };

    const handleCardClick = () => {
        navigate(`/task/${task.id}`);
    };

    return (
        <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={handleCardClick}>
            <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                    {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
                    {task.description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                    <Chip label={task.category} size="small" />
                    <Chip label={task.status} size="small" color={statusColors[task.status]} />
                    <Chip label={task.priority} size="small" variant="outlined" />
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(task.createdAt).toLocaleDateString()}
                    </Typography>
                    <IconButton onClick={handleDelete} aria-label="delete" size="small">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Stack>
            </CardContent>
        </Card>
    );
};