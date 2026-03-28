import styles from './Card.module.css'

function Card() {
    return(
        <div className={styles.card}>
            <h2>Task</h2>
            <h2>Description</h2>
        </div>
    );
}

export default Card