import React from 'react';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: string;
  index: number;
  deleteTask: (index: number) => void;
  moveTaskUp: (index: number) => void;
  moveTaskDown: (index: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, deleteTask, moveTaskUp, moveTaskDown }) => {
  return (
    <li className={styles.taskItem}>
      <span className={styles.taskText}>{task}</span>

      <div className={styles.taskButtons}>
        <button className={`${styles.taskButton} ${styles.moveButton}`} onClick={() => moveTaskUp(index)}>Up</button>
        <button className={`${styles.taskButton} ${styles.downButton}`} onClick={() => moveTaskDown(index)}>Down</button>
        <button className={`${styles.taskButton} ${styles.deleteButton}`} onClick={() => deleteTask(index)}>Delete</button>
      </div>

    </li>
  );
};

export default TaskItem;