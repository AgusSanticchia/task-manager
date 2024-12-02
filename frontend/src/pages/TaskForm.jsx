import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"    
import axios from "axios"

function TaskForm(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const params = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:4000/tasks", {
            title,
            description
        })
        console.log(res)
        e.target.reset()
    }
    
    useEffect(() => {
        if(params.id){
            fetchTask()
        }

        async function fetchTask() {
            const res= await axios.get(`http://localhost:8000/tasks/${params.id}`)
            console.log(res)
            setTitle(res.data.title)
            setDescription(res.data.description)
        }
    }, [])

    return(
        <div className="flew items-center justify-center h-[calc(100vh-10rem)]">
            <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    autoFocus
                />
                <textarea
                    pñaceholder="Write a description"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
                <button>{
                    params.id ? "Update Task" : "Save Task"}
                </button>
            
            </form>
        </div>
    )
}

export default TaskForm