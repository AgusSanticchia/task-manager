import { useState, useEffect } from "react";
import { createTask, fetchTask, updateTask, deleteTask } from "../api/tasks";
import { useParams, useNavigate } from "react-router-dom";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!params.id) {
        const res = await createTask({ title, description });
        console.log(res);
      } else {
        const res = await updateTask(params.id, { title, description });
        console.log(res);
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        alert(error.response.data.detail);
      }
    }

    e.target.reset();
  };

  useEffect(() => {
    if (params.id) {
      fetchTask(params.id)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-20rem)] ">
      <div>
        <form className="bg-zinc-950 p-10 rounded-md" onSubmit={handleSubmit}>
          <h1 className="flex items-center justify-center text-3xl font-bold my-4 tracking-widest">Create Task</h1>
          <input
            type="text"
            placeholder="Title"
            className="block p-2 py-2 px-3 mb-4 w-full text-black rounded-lg font-mono"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus
          />
          <textarea
            placeholder="Description"
            className="block p-2 py-2 px-3 mb-4 w-full text-black rounded-lg font-mono"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
          <button className="text-center bg-green-600 hover:text-gray-800 text-white font-bold p-2 px-4 rounded-lg w-full tracking-widest">
            {params.id ? "Update" : "Create"}
          </button>
        </form>

        {params.id && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={async () => {
              try {
                const res = await deleteTask(params.id);
                console.log(res);
                navigate("/");
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;