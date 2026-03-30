import React, { useEffect, useState } from 'react'
import styles from './TaskList.module.css'
import TaskItem from './TaskItem';

interface Task {
    id: number;
    text: string;
    done: boolean;
}

interface ToDoListProps {
    view: "active" | "completed";
}

function ToDoList({ view }: ToDoListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");

    useEffect(() => {
        fetch("http://localhost:8080/api/tasks")
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(err => console.error("Failed to fetch tasks", err));
    }, []);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value)
    }

    async function addTask() {
        if (newTask.trim() !== "") {
            const taskToAdd = { text: newTask, done: false };
            try {
                const response = await fetch("http://localhost:8080/api/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(taskToAdd)
                });
                if (response.ok) {
                    const updated = await fetch("http://localhost:8080/api/tasks");
                    const data = await updated.json();
                    setTasks(data);
                    setNewTask("");
                }
            } catch (err) {
                console.error("Failed to add task", err);
            }
        }
    }

    async function deleteTask(id: number) {
        try {
            const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setTasks(prev => prev.filter(task => task.id !== id));
            }
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    }

    async function doneTask(id: number) {
        try {
            const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
                method: "PATCH"
            });
            if (response.ok) {
                setTasks(prev => prev.map(task =>
                    task.id === id ? { ...task, done: !task.done } : task
                ));
            }
        } catch (err) {
            console.error("Failed to update task", err);
        }
    }

    return(
        <div className={styles.todoMain}>

            {view === "active" && (
                <div className={styles.todoHeader}>
                    <div className={styles.todoHeader1}>
                        <h1>Active Tasks</h1>
                    </div>
                    <div className={styles.todoHeader2}>
                        <input type="text" placeholder='Enter Task...' value={newTask} onChange={handleInputChange} className={styles.todoInput}/>
                        <button className={styles.addButton} onClick={addTask}>Create Task</button>
                    </div>
                </div>
            )}

            {view === "completed" && (
                <div className={styles.todoHeader}>
                    <div className={styles.todoHeader1}>
                        <h1>Completed Tasks</h1>
                    </div>
                </div>
            )}

            <ol>
                {tasks
                .filter(task => view === "active" ? !task.done : task.done)
                .map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        doneTask={doneTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </ol>
        </div>
    );
}

export default ToDoList