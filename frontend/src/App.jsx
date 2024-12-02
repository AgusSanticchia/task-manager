import { BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import TaskForm from "./pages/TaskForm"
function App() {  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<h1>Home Page</h1>} />
      <Route path="/task/new" element= {<h1>New Page</h1>} />
    </Routes>   
    </BrowserRouter>
  )

}

export default App
