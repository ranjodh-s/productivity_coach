import {react} from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Card({ title, value, icon, color, link }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(link);
    }

  return (

    // <NavLink to={link} className={navLinkStyle}>

    <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between" onClick={handleClick}>

      <div>

        <p className="text-gray-500 text-sm">

          {title}

        </p>

        <h2 className="text-3xl font-bold mt-2">

          {value}

        </h2>

      </div>

      <div className={`${color} text-white p-4 rounded-xl`}>

        {icon}

      </div>

    </div>

    //  </NavLink>

  );
}
