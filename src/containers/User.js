import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  GlobalStateProvider,
  GlobalDispatchProvider,
} from "../context/GlobalContextProvider";
import "antd/dist/antd.css";
import { message } from "antd";

export default function User() {
  const params = useParams();

  // Global State destructuring
  const { users, teams } = useContext(GlobalStateProvider);
  const dispatch = useContext(GlobalDispatchProvider);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [team, setTeam] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roleOptions, setRoleOptions] = useState(
    !isLoading && role === "stagiaire"
      ? ["Stagiaire", "Squad member"]
      : !isLoading && role === "squad member"
      ? ["Stagiaire", "Squad member", "Squad leader"]
      : ["Stagiaire", "Squad member", "Squad leader"]
  );

  // Fetch data for this user

  const fetchUserData = async () => {
    try {
      const { status, data } = await axios.get(
        `http://localhost:3030/user/${params.id}`
      );
      if (status === 200) {
        setEmail(data.email);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setRole(data.role);
        setTeam(data.team);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleModification = async (e) => {
    e.preventDefault();

    // Example of a request with GraphQL. Please uncomment following code to see
    // ------------------------
    // const body = {
    //   query: `
    //     mutation {
    //       modifyUser(id: "${params.id}", data: {email:"${email}", firstname: "${firstname}", lastname: "${lastname}", team: "${team}",   role: "${role}"}) {
    //     email
    //     firstname
    //     lastname
    //     team
    //     role
    //   }
    //     }
    //   `,
    // };
    // const { status, data } = await axios({
    //   url: "http://localhost:3000/graphql",
    //   method: "post",
    //   body: JSON.stringify(body),
    //   headers: { "Content-Type": "application/json" },
    // });
    // ------------------------

    const { status, data } = await axios.post(
      `http://localhost:3030/user/${params.id}/modify`,
      {
        email,
        firstname,
        lastname,
        role,
        team,
      }
    );
    if (status === 200) {
      // Update global state after success modification
      const { status, data } = await axios.get("http://localhost:3030/data");

      if (status === 200) {
        dispatch({ type: "FETCH_DATA", payload: { ...data } });
      }

      message.success("The user was well modified");
    } else {
      message.error("Something went wrong. The user was not modified.");
    }
  };

  return (
    <div className="w-full">
      {/* Following class of name max-w-1249px is made by a TailwindCSS plugin, see tailwind.config.js at the root of the project */}
      {!isLoading && (
        <form
          onSubmit={handleModification}
          className="flex flex-col mx-auto px-8 py-4 max-w-1249px"
        >
          <label htmlFor="email">Email</label>
          <input
            className="h-10 border-2 px-4"
            id="email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="firstname">Firstname</label>
          <input
            className="h-10 border-2 px-4"
            id="firstname"
            type="text"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <label htmlFor="lastname">Lastname</label>
          <input
            className="h-10 border-2 px-4"
            id="lastname"
            type="text"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <label htmlFor="function">Function</label>
          <select
            className="h-10 border-2 px-4"
            id="function"
            onChange={(e) => {
              setRole(e.target.value);

              // Logic for hierarchy of user functions/roles
              // Display only functions/role available

              if (e.target.value === "stagiaire") {
                setRoleOptions(["Stagiaire", "Squad member"]);
              }
              if (e.target.value === "squad member") {
                setRoleOptions(["Stagiaire", "Squad member", "Squad leader"]);
              }
              if (e.target.value === "squad leader") {
                setRoleOptions(["Stagiaire", "Squad member", "Squad leader"]);
              }
            }}
            defaultValue={role}
          >
            {roleOptions.map((option, index) => (
              <option key={index} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="team">Team</label>
          <select
            className="h-10 border-2 px-4"
            id="team"
            onChange={(e) => {
              setTeam(e.target.value);
            }}
          >
            <option value={team.toLowerCase()}>
              {team[0].toUpperCase() + team.slice(1)}
            </option>
            {teams &&
              teams.map((option, index) => {
                if (option.name === team) return;
                return (
                  <option key={index} value={option.name.toLowerCase()}>
                    {option.name[0].toUpperCase() + option.name.slice(1)}
                  </option>
                );
              })}
          </select>
          <div className="flex justify-end my-8">
            <button type="submit" className="py-2 px-4 bg-blue-300">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
