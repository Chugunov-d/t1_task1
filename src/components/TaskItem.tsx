import type {Task} from '../utils/task.ts';
import {Button, Card, CardContent, Chip, Stack, Typography} from "@mui/material";
import { Link } from 'react-router-dom';

type TaskProps = {
    task: Task;
}
const TaskItem = ({task}:TaskProps) => {
    return (
        <>
            <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                },
            }}
            >
                <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    {task.description && <Typography variant="body2">{task.description}</Typography>}
                    <Stack direction="row" spacing={1} mt={1} mb={1}>
                        <Chip label={task.category} color="primary" size="small" />
                        <Chip label={task.status} color="secondary" size="small" />
                        <Chip label={task.priority} color="warning" size="small" />
                    </Stack>
                    <Button size="small" component={Link} to={`/task/${task.id}`}>Редактировать</Button>
                </CardContent>
            </Card>
        </>
    );
};

export default TaskItem;