import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
    // Retrieve stored tasks or default to empty array
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : []
    });


    const [text, setText] = useState('');

    // Save tasks to Local Store whenever tasks state changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function addTask(text) {
        if (text.trim() === '') return;

        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setText('');
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    }
    return (
        <div className="todo-list">
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                />
            ))}
            <input
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button onClick={() => addTask(text)}>Add</button>
        </div>
    )
}

export default TodoList;