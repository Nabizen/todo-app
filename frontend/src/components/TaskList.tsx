import React, { useEffect, useState } from 'react'
import styles from './TaskList.module.css'
import TaskItem from './TaskItem';
import Modal from './ConfirmationBox';

interface Task {
    id: number;
    text: string;
    done: boolean;
    priority: string;
}

interface ToDoListProps {
    view: "active" | "completed";
}

function ToDoList({ view }: ToDoListProps) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [priority, setPriority] = useState("medium");

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
            const taskToAdd = { text: newTask, done: false, priority: priority };
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
            setOpenPopUp(false);
            setTaskToDelete(null);
        } catch (err) {
            console.error("Failed to delete task", err);
            setOpenPopUp(false)
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

    // 1. Filter active / completed first
    const filteredTasks = tasks.filter(task =>
        view === "active" ? !task.done : task.done
    );

    type Priority = "high" | "medium" | "low";

    // 2. Group by priority
    const groupedTasks: Record<Priority, Task[]> = {
        high: filteredTasks.filter(t => t.priority === "high"),
        medium: filteredTasks.filter(t => t.priority === "medium"),
        low: filteredTasks.filter(t => t.priority === "low"),
    };

    const priorities: { key: Priority; label: string }[] = [
        { key: "high", label: "🔴 High Priority" },
        { key: "medium", label: "🟡 Medium Priority" },
        { key: "low", label: "🟢 Low Priority" },
    ];

    return(
        <div className={styles.todoMain}>

            {view === "active" && (
                <div className={styles.todoHeader}>
                    <div className={styles.todoHeader1}>
                        <h1>Active Tasks</h1>
                    </div>
                    <div className={styles.taskInput}>
                        <input type="text" placeholder='Enter Task...' value={newTask} onChange={handleInputChange} className={styles.textInput}/>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
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

            <div>
                {priorities.map(priority => (
                    <div key={priority.key}>

                        {/* Only show section if it has tasks */}
                        {groupedTasks[priority.key].length > 0 && (
                            <h3>{priority.label}</h3>
                        )}

                        {groupedTasks[priority.key].map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                doneTask={() => doneTask(task.id)}
                                deleteTask={() => {
                                    setOpenPopUp(true);
                                    setTaskToDelete(task);
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* <ol>
                {tasks
                .filter(task => view === "active" ? !task.done : task.done)
                .map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        doneTask={() => doneTask(task.id)}
                        deleteTask={() => {
                            setOpenPopUp(true);                            
                            setTaskToDelete(task);

                        }}
                    />
                ))}
            </ol> */}

            <Modal
                task={taskToDelete}
                isOpen={openPopUp}
                onClose={() => setOpenPopUp(false)}
                onConfirm={deleteTask}
                title="Delete Task?"
                >Are you sure you want to delete this task?
            </Modal>
        </div>
    );
}

export default ToDoList