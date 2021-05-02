import React, { useContext } from "react";
import { GlobalStateProvider } from "../context/GlobalContextProvider";
import TeamLine from "../components/TeamLine";

export default function Teams() {
  // Global State destructuring
  const { teams, isLoading } = useContext(GlobalStateProvider);

  return (
    <div className="flex justify-center items-center">
      {/* Following class of name max-w-1249px is made by a TailwindCSS plugin, see tailwind.config.js at the root of the project */}
      <div className="max-w-1249px">
        <div className="flex h-20">
          <div className="flex flex-col h-full w-60">
            <span className="h-1/2 w-full border-b-2 border-gray-300 flex justify-center items-center">
              Organisation
            </span>
            <div className="h-1/2 w-full"></div>
          </div>
          <div className="flex flex-col h-full w-60">
            <span className="h-1/2 w-full border-b-2 border-gray-300 flex justify-center items-center">
              Team
            </span>
            <div className="h-1/2 w-full"></div>
          </div>
          <div className="flex flex-col h-full w-96">
            <div className="h-1/2 w-full border-b-2 border-gray-300 flex justify-center items-center">
              Users
            </div>
            <div className="h-1/2 w-full flex">
              <span className="w-1/3 flex justify-center items-center">
                Firstname
              </span>
              <span className="w-1/3 flex justify-center items-center">
                Lastname
              </span>
              <span className="w-1/3 flex justify-center items-center">
                Function
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {!isLoading &&
            teams.map((team, index) => {
              return (
                <TeamLine
                  key={team._id}
                  organisation={
                    team.organisation &&
                    team.organisation[0].toUpperCase() +
                      team.organisation.slice(1)
                  }
                  name={
                    team.name && team.name[0].toUpperCase() + team.name.slice(1)
                  }
                  users={team.users}
                  index={index}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
