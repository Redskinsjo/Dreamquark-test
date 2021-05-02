import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Header() {
  // Use of page location with react-router-dom
  const location = useLocation();

  return (
    <div className="h-36 w-full flex justify-center items-center border-b-2 border-black">
      <nav>
        <ul className="flex">
          <li
            className={`mx-8 text-lg hover:underline cursor-pointer ${
              location.pathname === "/" && "font-bold"
            }`}
          >
            <Link to="/" className="text-black">
              Create
            </Link>
          </li>
          <li
            className={`mx-8 text-lg hover:underline cursor-pointer ${
              location.pathname === "/teams" && "font-bold"
            }`}
          >
            <Link to="/teams" className="text-black">
              Teams
            </Link>
          </li>

          <li
            className={`mx-8 text-lg hover:underline ${
              !location.pathname.includes("/user") && "cursor-not-allowed"
            } ${location.pathname.includes("/user") && "font-bold"}`}
          >
            User
          </li>
        </ul>
      </nav>
    </div>
  );
}
