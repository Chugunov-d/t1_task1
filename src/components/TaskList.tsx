import type {Task} from '../utils/task.ts';
import TaskItem from "./TaskItem.tsx";
import {Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";
import {useState} from "react";

type TaskProps = {
    tasks: Task[];
}

const TaskList = ({tasks}:TaskProps) => {

    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    const handleFilter = (task: Task) => {
        return (
            (statusFilter === '' || task.status === statusFilter) &&
            (categoryFilter === '' || task.category === categoryFilter) &&
            (priorityFilter === '' || task.priority === priorityFilter)
        );
    };

    const filteredTasks = tasks.filter(handleFilter)
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" textAlign={"center"} marginBottom={5} gutterBottom>Task Manager</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3} justifyContent="center">
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        label="Category"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Bug">Bug</MenuItem>
                        <MenuItem value="Feature">Feature</MenuItem>
                        <MenuItem value="Documentation">Documentation</MenuItem>
                        <MenuItem value="Refactor">Refactor</MenuItem>
                        <MenuItem value="Test">Test</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 130 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        label="Priority"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            <Grid container spacing={3}  justifyContent="center">
                {filteredTasks.map((task: Task) => (
                    <Grid size={{xs:12, sm:6, md:4}} >
                        <TaskItem key={task.id} task={task}></TaskItem>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default TaskList;