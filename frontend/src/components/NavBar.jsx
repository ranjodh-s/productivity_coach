import { NavLink, useNavigate } from "react-router-dom";
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


// import { Link, NavLink } from "react-router-dom";
// import { Bell, Search, User } from "lucide-react";

// export default function Navbar() {
//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">

//       <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-3xl font-bold text-blue-600"
//         >
//           AI Planner
//         </Link>

//         {/* Navigation Links */}
//         <div className="flex items-center gap-8">

//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-600 hover:text-blue-600"
//             }
//           >
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/add-task"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-600 hover:text-blue-600"
//             }
//           >
//             Tasks
//           </NavLink>

//           <NavLink
//             to="/add-schedule"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-600 hover:text-blue-600"
//             }
//           >
//             Routine
//           </NavLink>

//           <NavLink
//             to="/ai"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-600 hover:text-blue-600"
//             }
//           >
//             AI Planner
//           </NavLink>

//           <NavLink
//             to="/focus"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-600 hover:text-blue-600"
//             }
//           >
//             Focus
//           </NavLink>

//           <NavLink
//             to="/analytics"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-600 hover:text-blue-600"
//             }
//           >
//             Analytics
//           </NavLink>

//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-5">

//           {/* Search */}

//           <div className="relative">

//             <Search
//               size={18}
//               className="absolute left-3 top-3 text-gray-400"
//             />

//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//           </div>

//           {/* Notifications */}

//           <button className="relative">

//             <Bell
//               size={24}
//               className="text-gray-600"
//             />

//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">

//               3

//             </span>

//           </button>

//           {/* Profile */}

//           <div className="w-10 h-10 rounded-full bg-blue-600 flex justify-center items-center text-white">

//             <User size={20} />

//           </div>

//         </div>

//       </div>

//     </nav>
//   );
// }