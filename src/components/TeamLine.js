import React from "react";
import UserLine from "../components/UserLine";

// Component displays each team in page Teams
export default function TeamLine({ organisation, name, users, index }) {
  return (
    <div className={`flex h-20 ${index % 2 === 0 && "bg-blue-100"}`}>
      <span className="flex justify-center items-center h-full w-60">
        {organisation}
      </span>
      <span className="flex justify-center items-center h-full w-60 font-bold">
        {name}
      </span>
      <div className="flex flex-col flex-grow h-full w-96 justify-around">
        {users.map((user) => (
          <UserLine
            key={user._id}
            firstname={
              user.firstname &&
              user.firstname[0].toUpperCase() + user.firstname.slice(1)
            }
            lastname={
              user.lastname &&
              user.lastname[0].toUpperCase() + user.lastname.slice(1)
            }
            role={user.role && user.role[0].toUpperCase() + user.role.slice(1)}
            id={user._id}
          />
        ))}
      </div>
    </div>
  );
}
