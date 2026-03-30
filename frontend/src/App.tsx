// import Header from './components/Header.tsx'
import ToDoList from './components/TaskList.tsx'
import SideBar from './components/SideBar.tsx'
import { useState } from 'react';

function App() {
  const [view, setView] = useState<"active" | "completed">("active");

  return(
    <div className="dashboard-page">
      <div className='dashboard-main'>
        <SideBar view={view} setView={setView}/>
        <ToDoList view={view} />
      </div>
    </div>
  );
}

export default App
