import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <header className="flex justify-between items-center my-7 bg-blue-500 p-4 rounded-md">
      <Link to="/">
        <h1 className="text-3xl font-bold">Task App</h1>
      </Link>
      {location.pathname === "/" ? (
        <Link
          to="/tasks/new"
          className="bg-zinc-950 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Create Task
        </Link>
      ) : (
        <Link
          to="/"
          className="bg-zinc-950 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      )}
    </header>
  );
}

export default Navbar;