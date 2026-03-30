import styles from './SideBar.module.css'

interface SideBarProps {
    view: "active" | "completed";
    setView: (view: "active" | "completed") => void;
}

function Sidebar({ view, setView}: SideBarProps) {
    return(
        <div className={styles.sidebar}>
            <h1>Dashboard</h1>

            <nav>
                <ul>
                    <li>
                        <button onClick={() => setView("active")} className={view === "active" ? styles.active : ""}>Active Tasks</button>
                    </li>
                    <li>
                        <button onClick={() => setView("completed")} className={view === "completed" ? styles.active : ""}>Completed Tasks</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar