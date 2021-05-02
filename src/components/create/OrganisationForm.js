import React, { useState, useContext } from "react";
import axios from "axios";

import { GlobalDispatchProvider } from "../../context/GlobalContextProvider";

export default function UserForm({ setNotif }) {
  const [name, setName] = useState("");

  const dispatch = useContext(GlobalDispatchProvider);

  // Function which create item in DB and update global state

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const { status, data } = await axios.post(
        "http://localhost:3030/organisation/create",
        {
          name,
          // ajout d'un tableau d'équipes en API
          // Id sera ajouté automatiquement à la création dans le DB
        }
      );

      if (status === 200) {
        setName("");

        setNotif({ form: "organisation" });
        dispatch({
          type: "CREATE",
          entity: "organisation",
          payload: data,
        });
      } else {
        console.log("Erreur lors de la création de l'organisation");
      }
    } catch (error) {
      console.log(error.message);
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
      <div className="flex justify-end my-8">
        <button type="submit" className="py-2 px-4 bg-blue-300">
          Create
        </button>
      </div>
    </form>
  );
}
