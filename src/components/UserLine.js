import React from "react";
import { Link } from "react-router-dom";

// Component displays each user in page Teams
export default function UserLine({ firstname, lastname, role, id }) {
  return (
    <Link to={`/user/${id}`} className="flex">
      <div className="flex w-full hover:bg-gray-700 group">
        <span className="w-1/3 flex justify-center items-center group-hover:text-white">
          {firstname}
        </span>
        <span className="w-1/3 flex justify-center items-center group-hover:text-white">
          {lastname}
        </span>
        <span className="w-1/3 flex justify-center items-center group-hover:text-white">
          {role}
        </span>
      </div>
    </Link>
  );
}
