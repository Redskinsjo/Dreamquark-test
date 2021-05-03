import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "axios";

import {
  GlobalStateProvider,
  GlobalDispatchProvider,
} from "../../context/GlobalContextProvider";

export default function UserForm({ setNotif }) {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [ORGANISATION, setOrganisation] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");

  // Global State destructuring
  const { organisations, isLoading } = useContext(GlobalStateProvider);
  const dispatch = useContext(GlobalDispatchProvider);

  // State will change on choice of an organisation
  const [teamsAvailable, setTeamsAvailable] = useState();

  // Filter the teams depending on the organisation chosen

  // const fetchTeamsAvailable = () => {
  //   const orgChosen = organisations.find(
  //     (org) => org.name.toLowerCase() === ORGANISATION.toLowerCase()
  //   );

  //   let teams;
  //   if (orgChosen) {
  //     teams = [...orgChosen.teams];
  //   }

  //   setTeamsAvailable(teams);
  // };

  const fetchTeamsAvailable = useCallback(() => {
    const orgChosen = organisations.find(
      (org) => org.name.toLowerCase() === ORGANISATION.toLowerCase()
    );

    let teams;
    if (orgChosen) {
      teams = [...orgChosen.teams];
    }

    setTeamsAvailable(teams);
  }, [organisations, ORGANISATION]);

  useEffect(() => {
    fetchTeamsAvailable();
  }, [fetchTeamsAvailable]);

  // Function which create item in DB and update global state

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axios.post(
        process.env.REACT_APP_API_REST_URI + "/user/create",
        {
          email,
          firstname,
          lastname,
          team,
          role,
        }
      );
      if (status === 200) {
        setEmail("");
        setFirstname("");
        setLastname("");
        setTeam("");
        setRole("");

        setNotif({ form: "user" });
        const { status, data } = await axios.get(
          process.env.REACT_APP_API_REST_URI + "/data"
        );

        if (status === 200) {
          dispatch({ type: "FETCH_DATA", payload: { ...data } });
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <form onSubmit={handleCreate} className="flex flex-col px-8 py-4">
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
      <label htmlFor="organisation">Organisation</label>
      <select
        className="h-10 border-2 px-4"
        id="organisation"
        onChange={(e) => {
          setOrganisation(e.target.value);
        }}
      >
        <option value="">--Please choose an option--</option>
        {/* Dynamic rendering of the options (organisations) */}
        {!isLoading &&
          organisations.map((org) => (
            <option key={org._id} value={org.name}>
              {org.name[0].toUpperCase() + org.name.slice(1)}
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
        <option value="">--Please choose an option--</option>
        {/* Dynamic rendering of the options (teams) */}
        {teamsAvailable &&
          teamsAvailable.map((team) => (
            <option key={team._id} value={team.name}>
              {team.name[0].toUpperCase() + team.name.slice(1)}
            </option>
          ))}
      </select>
      <label htmlFor="function">Function</label>
      <select
        className="h-10 border-2 px-4"
        id="function"
        onChange={(e) => {
          setRole(e.target.value);
        }}
      >
        <option value="">--Please choose an option--</option>
        <option value="squad leader">Squad leader</option>
        <option value="squad member">Squad member</option>
        <option value="stagiaire">Stagiaire</option>
      </select>
      <div className="flex justify-end my-8">
        <button type="submit" className="py-2 px-4 bg-blue-300">
          Create
        </button>
      </div>
    </form>
  );
}
