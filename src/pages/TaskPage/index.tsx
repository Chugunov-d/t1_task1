import { TaskList } from '../../widgets/TaskList';
import {
    Container,
    Typography,
    Box,
    Button,
    Stack,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    CircularProgress, Alert
} from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import {categoryOptions, fetchTasks, type ITask, priorityOptions, statusOptions} from "../../features/cardSlice.ts";
import {useSelector} from "react-redux";
import {type RootState, useAppDispatch} from "../../app/store.ts";

const TasksPage = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    const handleFilter = (task: ITask) => {
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

    const dispatch = useAppDispatch();
    const { status, error } = useSelector((state: RootState) => state.tasks);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks());
        }
    }, [status, dispatch]);

    let content;
    if (status === 'loading') {
        content = <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
    } else if (status === 'succeeded') {
        content = <TaskList tasks={filteredTasks}/>;
    } else if (status === 'failed') {
        content = <Alert severity="error">{error}</Alert>;
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1">
                        Менеджер задач
                    </Typography>
                    <Button component={Link} to="/task/new" variant="contained" startIcon={<AddIcon />}>
                        Создать задачу
                    </Button>
                </Box>
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
                {content}
            </Box>
        </Container>
    );
};

export default TasksPage;