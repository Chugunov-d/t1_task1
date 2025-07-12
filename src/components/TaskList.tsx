import type {Task} from '../utils/task.ts';
import TaskItem from "./TaskItem.tsx";
import {Container, Grid, Typography} from "@mui/material";

type TaskProps = {
    tasks: Task[];
}

const TaskList = ({tasks}:TaskProps) => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" textAlign={"center"} marginBottom={5} gutterBottom>Task Manager</Typography>
            <Grid container spacing={3}  justifyContent="center">
                {tasks.map((task: Task) => (
                    <Grid size={{xs:12, sm:6, md:4}} >
                        <TaskItem key={task.id} task={task}></TaskItem>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TaskList;