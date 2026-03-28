import React, { useState } from 'react'
import styles from './ToDoList.module.css'
import TaskItem from './TaskItem';

function ToDoList() {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState<string>("");

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value)
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }

    function deleteTask(index: number) {
        const updatedTasks = tasks.filter((_, i) => i !== index)
        setTasks(updatedTasks);
    }

    function moveTaskUp(index: number) {
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks)
        }
    }

    function moveTaskDown(index: number) {
        if(index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks)
        }
    }

    return(
        <div className={styles.todoMain}>
            <div className={styles.todoHeader}>
                <div className={styles.todoHeader1}>
                    <h1>To-Do-List</h1>
                </div>
                <div className={styles.todoHeader2}>
                    <input type="text" placeholder='Enter Task...' value={newTask} onChange={handleInputChange} className={styles.todoInput}/>
                    <button className={styles.addButton} onClick={addTask}>Create Task</button>
                </div>
            </div>

            <ol>
                {tasks.map((task, index) => (
                <TaskItem
                    key={index}
                    task={task}
                    index={index}
                    deleteTask={deleteTask}
                    moveTaskUp={moveTaskUp}
                    moveTaskDown={moveTaskDown}
                />
                ))}
            </ol>

            {/* <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className='text'>{task}</span>
                        <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                        <button className='move-button' onClick={() => moveTaskUp(index)}>Up</button>
                        <button className='down-button' onClick={() => moveTaskDown(index)}>Down</button>
                    </li>
                )}
            </ol> */}
        </div>
    );
}

export default ToDoList