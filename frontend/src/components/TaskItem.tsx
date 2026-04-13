import styles from './TaskItem.module.css';

interface Task {
    id: number;
    text: string;
    done: boolean;
    priority: string;
}

interface TaskItemProps {
  task: Task;
  doneTask:() => void;
  deleteTask?: () => void;
}

function TaskItem({ task, doneTask, deleteTask }: TaskItemProps) {
    return (
        <li className={`${styles.taskItem} ${styles[task.priority]}`}>
            <span className={styles.taskText}>{task.text}</span>
            <div className={styles.taskButtons}>
                <button className={`${styles.taskButton} ${styles.doneButton}`} onClick={doneTask}>{task.done ? "Undo" : "Done"}</button>
                <button className={`${styles.taskButton} ${styles.deleteButton}`} onClick={deleteTask}>Delete</button>
            </div>
        </li>
    );
}

export default TaskItem;