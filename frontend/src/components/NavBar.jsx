import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  BrainCircuit,
  Timer,
  BarChart3,
  LogOut,
  UserCircle,
} from "lucide-react";

import { getUserInfo } from "../services/userApi";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
    }`;

    let token = localStorage.getItem("token");
    let payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
    let userId = payload ? payload.id : null;
    let [user, setUser] = useState(null);
    async function fetchUserInfo() {
      try {
        let response = await getUserInfo(userId);
        setUser(response.data);
        console.log("User Info:", response.name);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
    useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <div className="text-2xl font-bold text-blue-600">
            AI Planner
          </div>

          {/* Navigation */}

          <div className="flex items-center gap-2">

            <NavLink to="/" className={navLinkStyle}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/tasks" className={navLinkStyle}>
              <CheckSquare size={18} />
              Tasks
            </NavLink>

            <NavLink to="/schedule" className={navLinkStyle}>
              <CalendarDays size={18} />
              Routine
            </NavLink>

            <NavLink to="/ai" className={navLinkStyle}>
              <BrainCircuit size={18} />
              AI Planner
            </NavLink>

            <NavLink to="/focus" className={navLinkStyle}>
              <Timer size={18} />
              Focus
            </NavLink>

          </div>

          {/* Right Side */}

          <div className="flex items-center gap-5">
            <div className="text-gray-700">
              {user ? `Hello, ${user.name}` : "Loading..."}
            </div>
            <UserCircle
              size={36}
              className="text-gray-600"
            />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}
