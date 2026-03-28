// import Header from './components/Header.tsx'
import ToDoList from './components/ToDoList.tsx'
import SideBar from './components/SideBar.tsx'

function App() {

  return(
    <div className="dashboard-page">
      <div className='dashboard-main'>
        <SideBar/>
        <ToDoList/>
      </div>
    </div>
  );

  // const [todos, setTodos] = useState<string[]>([]);
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/todos") // your backend API
  //     .then((res) => res.json())
  //     .then((data) => setTodos(data))
  //     .catch((err) => console.error("Error fetching todos:", err));
  // }, []);

  // return (
  //   <div>
  //     <h1>Todo List</h1>
  //     <ul>
  //       {todos.map((todo, i) => (
  //         <li key={i}>{todo}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}

export default App
