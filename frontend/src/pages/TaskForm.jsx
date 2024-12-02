import { useState } from "react"
import axios from "axios"
function TaskForm(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:4000/tasks", {
            title,
            description
        })
        console.log(res)
        e.target.reset()
    }

    return(
        <div className="flew items-center justify-center h-[calc(100vh-10rem)]">
            <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <textarea
                    pñaceholder="Write a description"
                    className="block py-2 px-3 mb-4 w-full text-black"
                    rows={3}
                ></textarea>
                <button>Save</button>
            </form>
        </div>
    )
}

export default TaskForm