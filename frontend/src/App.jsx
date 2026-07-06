import { useState, useEffect } from 'react'
import { redirect, Route, Routes} from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard.jsx'
import AddTask from "./pages/AddTask.jsx";
import DailyRoutine from "./pages/DailyRoutine";
import AIPlanner from "./pages/AIPlanner";
import FocusMode from "./pages/FocusMode";
import Navbar from './components/NavBar.jsx';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { Navigate } from "react-router-dom";





function App() {
  const [token,setToken] = useState(localStorage.getItem("token"));
  
  
  return (
    <>
    {token && <Navbar setToken={setToken} />}
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <AddTask />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <DailyRoutine />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <AIPlanner />
          </ProtectedRoute>
        }
      />
      <Route
    path="/focus"
    element={
      <ProtectedRoute>
        <FocusMode />
      </ProtectedRoute>
    }
/>
<Route
    path="/signup"
    element={<Signup />}
/>

    <Route
    path="/login"
    element={token ? <Navigate to="/dashboard" replace /> : <Login setToken={setToken} />}
/>
      </ Routes>
      
    </>
  )
}

export default App
