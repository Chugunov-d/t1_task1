export interface Task{
    id: number;
    title: string;
    description?: string;
    category: Category;
    status: Status;
    priority: Priority;
}
export type Status = 'To Do' | 'In Progress' | 'Done';
export type Priority = 'Low' | 'Medium' | 'High';
export type Category = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';


export const tasks: Task[] = [
    {
        id: 1,
        title: 'Card1',
        description: 'Description1',
        category: 'Bug',
        status: 'In Progress',
        priority: 'Medium'
    },
    {
        id: 2,
        title: 'Card2',
        description: 'Description2',
        category: 'Feature',
        status: 'In Progress',
        priority: 'Low'
    },
    {
        id: 3,
        title: 'Card3',
        description: 'Description3',
        category: 'Test',
        status: 'To Do',
        priority: 'High'
    },
    {
        id: 4,
        title: 'Card4',
        description: 'Description4',
        category: 'Documentation',
        status: 'Done',
        priority: 'Low'
    },
    {
        id: 5,
        title: 'Card5',
        description: 'Description5',
        category: 'Refactor',
        status: 'In Progress',
        priority: 'Medium'
    },
    {
        id: 6,
        title: 'Card6',
        description: 'Description6',
        category: 'Bug',
        status: 'To Do',
        priority: 'Low'
    }
]