import styles from './SideBar.module.css'

function Sidebar() {
    return(
        <div className={styles.container}>
            <h1>Dashboard</h1>
            <h1>Time</h1>
            <h1>Completed Tasks</h1>
        </div>
    );
}

export default Sidebar