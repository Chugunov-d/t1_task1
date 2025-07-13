import {categoryOptions, priorityOptions, statusOptions, type Task} from '../utils/task.ts';
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

    const statusesOptions = ['All', ...statusOptions];
    const prioritiesOptions = ['All', ...priorityOptions];
    const categoriesOptions = ['All', ...categoryOptions];

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
                        {statusesOptions.map((option) => (
                            <MenuItem
                                key={option}
                                value={option === 'All' ? '' : option}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        label="Category"
                    >
                        {categoriesOptions.map((option) => (
                            <MenuItem
                                key={option}
                                value={option === 'All' ? '' : option}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 130 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        label="Priority"
                    >
                        {prioritiesOptions.map((option) => (
                            <MenuItem
                                key={option}
                                value={option === 'All' ? '' : option}
                            >
                                {option}
                            </MenuItem>
                        ))}
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