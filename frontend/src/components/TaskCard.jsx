import { useNavigate } from "react-router-dom"

function TaskCard() {
    const navigate = useNavigate()
    return (
        <div
        key={task.id}
        className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950"
        onClick={() => navigate(`/tasks/${task.id}`)}
        >           
            <div >
             <h2>{task.title}</h2>        
             <p>{task.description}</p>
            </div>
        </div>
    );
}

export default TaskCard;