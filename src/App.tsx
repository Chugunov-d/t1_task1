import { BrowserRouter as  Router, Routes, Route} from 'react-router-dom';
import TaskList from './components/TaskList';
import './App.css'
import {type Task, tasks as initialTasks} from "./utils/task.ts";
import TaskDetails from "./components/TaskDetails.tsx";
import {useEffect, useState} from "react";

function App() {

    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const updateTask = (updatedTask: Task) => {
        setTasks(prev =>
            prev.map(task => task.id === updatedTask.id ? updatedTask : task)
        );
    };

    return (
    <>
        <Router>
            <Routes>
                <Route path='/' element = {<TaskList tasks={tasks}/>}/>
                <Route path="/task/:id" element={<TaskDetails  tasks={tasks} onSave={updateTask}/>} />
            </Routes>
        </Router>
    </>
  )
}

export default App
