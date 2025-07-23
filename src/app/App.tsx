import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TasksPage from '../pages/TaskPage';
import TaskFormPage from '../pages/TaskFormPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <TasksPage />,
    },
    {
        path: '/task/new',
        element: <TaskFormPage />,
    },
    {
        path: '/task/:id',
        element: <TaskFormPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;