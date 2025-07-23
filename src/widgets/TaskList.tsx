import { TaskItem } from '../entities/Task/ui/TaskItem';
import {Grid, Box, Typography, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import type {ITask} from "../features/cardSlice.ts";

interface TaskListProps {
    tasks: ITask[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
    if (tasks.length === 0) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography variant="h5">Задач пока нет</Typography>
                <Button component={Link} to="/task/new" variant="contained" sx={{mt: 2}}>
                    Создать первую задачу
                </Button>
            </Box>
        )
    }

    return (
        <Box>
            <Grid container spacing={3}>
                {tasks.map((task: ITask) => (
                    <Grid size={{xs:12, sm:6, md:4}} key={task.id}>
                        <TaskItem task={task} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};