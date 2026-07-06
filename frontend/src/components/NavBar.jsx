import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  BrainCircuit,
  Timer,
  LogOut,
  UserCircle,
  Menu,
  X,
} from "lucide-react";

import { getUserInfo } from "../services/userApi";

export default function Navbar({ setToken }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login", { replace: true });
  }

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
    }`;

  const token = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = payload?.id;

  async function fetchUserInfo() {
    try {
      const response = await getUserInfo(userId);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  useEffect(() => {
    if (userId) {
      fetchUserInfo();
    }
  }, []);

  return (
    <nav className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            AI Planner
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
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

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="text-gray-700 font-medium">
              {user ? `Hello, ${user.name}` : "Loading..."}
            </div>

            <UserCircle size={36} className="text-gray-600" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t py-4">

            <div className="flex items-center gap-3 px-4 mb-4">
              <UserCircle size={34} className="text-gray-600" />
              <span className="font-medium text-gray-700">
                {user ? `Hello, ${user.name}` : "Loading..."}
              </span>
            </div>

            <div className="flex flex-col gap-2">

              <NavLink
                to="/"
                className={navLinkStyle}
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>

              <NavLink
                to="/tasks"
                className={navLinkStyle}
                onClick={() => setIsOpen(false)}
              >
                <CheckSquare size={18} />
                Tasks
              </NavLink>

              <NavLink
                to="/schedule"
                className={navLinkStyle}
                onClick={() => setIsOpen(false)}
              >
                <CalendarDays size={18} />
                Routine
              </NavLink>

              <NavLink
                to="/ai"
                className={navLinkStyle}
                onClick={() => setIsOpen(false)}
              >
                <BrainCircuit size={18} />
                AI Planner
              </NavLink>

              <NavLink
                to="/focus"
                className={navLinkStyle}
                onClick={() => setIsOpen(false)}
              >
                <Timer size={18} />
                Focus
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-3"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
