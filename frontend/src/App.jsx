import { useState } from 'react'
import { Route, Routes} from 'react-router-dom'
import './App.css'
// import Form from './Form.jsx'
// import TaskList from './components/TaskList.jsx'
// import TaskForm from './components/TaskForm.jsx'
// import DailyScheduleForm from './components/DailyScheduleForm.jsx'

import Dashboard from './pages/Dashboard.jsx'
import AddTask from "./pages/AddTask.jsx";
import DailyRoutine from "./pages/DailyRoutine";
import AIPlanner from "./pages/AIPlanner";
import FocusMode from "./pages/FocusMode";
import Navbar from './components/NavBar.jsx';
import Signup from "./pages/Signup";
import Login from "./pages/Login";





function App() {
  
  return (
    <>
    <Navbar />
      <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />
      <Route
        path="/tasks"
        element={<AddTask />}
      />
      <Route
        path="/schedule"
        element={<DailyRoutine />}
      />
      <Route
        path="/ai"
        element={<AIPlanner />}
      />
      <Route
    path="/focus"
    element={<FocusMode />}
/>
<Route
    path="/signup"
    element={<Signup />}
/>

    <Route
    path="/login"
    element={<Login />}
/>
      </ Routes>
      
    </>
  )
}

export default App
