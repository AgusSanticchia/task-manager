import { useEffect, useState} from "react"
import TaskList from "../components/TaskList";

function HomePage(){
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        async function fetchTasks(){
            const res = await fetch("http://localhost:8000/tasks");
            console.log(res)
            setTasks(res.data);
        }
        fetchTasks();
    },[])

    return(
    <>
        <h1>Tasks</h1>
        <TaskList tasks={tasks}/>
    </>
        
    )
}

export default HomePage