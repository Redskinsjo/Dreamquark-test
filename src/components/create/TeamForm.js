import React, { useState, useContext } from "react";
import axios from "axios";

import {
  GlobalStateProvider,
  GlobalDispatchProvider,
} from "../../context/GlobalContextProvider";

export default function UserForm({ setNotif }) {
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");

  // Global State destructuring
  const { organisations, isLoading } = useContext(GlobalStateProvider);
  const dispatch = useContext(GlobalDispatchProvider);

  // Function which create item in DB and update global state

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axios.post(
        "https://dreamquark-rest-api.herokuapp.com/team/create",
        {
          name,
          organisation,
        }
      );
      if (status === 200) {
        setName("");
        setOrganisation("");

        setNotif({ form: "team" });
        const { status, data } = await axios.get(
          "https://dreamquark-rest-api.herokuapp.com/data"
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
      <label htmlFor="name">Name</label>
      <input
        className="h-10 border-2 px-4"
        id="name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
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
        {!isLoading &&
          organisations.map((org) => (
            <option key={org._id} value={org.name}>
              {org.name[0].toUpperCase() + org.name.slice(1)}
            </option>
          ))}
      </select>
      <div className="flex justify-end my-8">
        <button type="submit" className="py-2 px-4 bg-blue-300">
          Create
        </button>
      </div>
    </form>
  );
}
