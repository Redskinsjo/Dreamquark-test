import React, { useState } from "react";
import UserForm from "../components/create/UserForm";
import TeamForm from "../components/create/TeamForm";
import OrganisationForm from "../components/create/OrganisationForm";

export default function Create() {
  const [tab, setTab] = useState(1);
  const [notif, setNotif] = useState(false);

  return (
    <div className="flex justify-center items-start my-12 flex-grow">
      <div className="flex flex-col w-96 border-2 border-gray-700">
        {/* Div concernant les onglets User, Team et Organisation */}
        <div className="flex justify-center h-20 items-center border-b-2 border-gray-300">
          <span
            className={`mx-6 hover:underline cursor-pointer ${
              tab === 1 && "font-bold"
            }`}
            onClick={() => {
              setTab(1);
              setNotif(false);
            }}
          >
            User
          </span>
          <span
            className={`mx-6 hover:underline cursor-pointer ${
              tab === 2 && "font-bold"
            }`}
            onClick={() => {
              setTab(2);
              setNotif(false);
            }}
          >
            Team
          </span>
          <span
            className={`mx-6 hover:underline cursor-pointer ${
              tab === 3 && "font-bold"
            }`}
            onClick={() => {
              setTab(3);
              setNotif(false);
            }}
          >
            Organisation
          </span>
        </div>

        {/* Div concernant le formulaire affiché et la notification de création */}
        <div>
          <div>
            {!notif && tab === 1 && <UserForm setNotif={setNotif} />}
            {!notif && tab === 2 && <TeamForm setNotif={setNotif} />}
            {!notif && tab === 3 && <OrganisationForm setNotif={setNotif} />}
            {notif && (
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-300 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>The {notif.form} was created !</span>
                <div
                  onClick={() => {
                    setNotif(false);
                  }}
                  className="hover:underline cursor-pointer text-blue-500"
                >
                  Create a new <span>{notif.form}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
