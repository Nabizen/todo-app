import styles from './Header.module.css'

function Header() {
    return(
        <div className={styles.header}>
            <h1>Dashboard</h1>
            <h1>Date & Time</h1>
        </div>
    );
}

export default Header