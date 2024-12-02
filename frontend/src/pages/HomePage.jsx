import { useEffect, useState} from "react"
import TaskList from "../components/TaskList";

function HomePage(){
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        async function fetchTasks(){
            const res = await fetch("http://localhost:8000/api/tasks");
            console.log(res);
            setTasks(res.data);
        }
        fetchTasks();
    },[])

    return(
    <>
        <h1 className="text-2xl p-2 m-3 text-start">Tasks List</h1>
        <TaskList tasks={tasks} className=" flex flex-col gap-2"/>
    </>
        
    )
}

export default HomePage;