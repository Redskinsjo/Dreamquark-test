import React, { useEffect, useReducer, createContext } from "react";
import axios from "axios";

export const GlobalStateProvider = createContext();
export const GlobalDispatchProvider = createContext();

const initialState = {
  users: [],
  teams: [],
  organisations: [],
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...action.payload,
        isLoading: false,
      };

    case "CREATE":
      if (action.entity === "user") {
        //
        const users = [...state.users, action.payload];
        return {
          users,
          teams: state.teams,
          organisations: state.organisations,
          isLoading: state.isLoading,
        };
        //
      } else if (action.entity === "team") {
        //
        const teams = [...state.teams, action.payload];
        return {
          users: state.users,
          teams,
          organisations: state.organisations,
          isLoading: state.isLoading,
        };
        //
      } else if (action.entity === "organisation") {
        //
        const organisations = [...state.organisations, action.payload];
        return {
          users: state.users,
          teams: state.teams,
          organisations,
          isLoading: state.isLoading,
        };
        //
      }
      break;
    case "MODIFY_USER":
      // copy of users state, modify copy and reassign to global state
      const id = action.id;
      const users = [...state.users];
      const index = users.findIndex((user) => user.id === id);
      users.splice(index, 1, action.payload);

      return {
        users,
        teams: state.teams,
        organisations: state.organisations,
        isLoading: state.isLoading,
      };
    default:
      return state;
  }
};

export default function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch global state data after mounting from Express API and import it in global state
  const fetchData = async () => {
    const { status, data } = await axios.get(
      process.env.REACT_APP_API_REST_URI + "/data"
    );

    if (status === 200) {
      dispatch({ type: "FETCH_DATA", payload: { ...data } });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalStateProvider.Provider value={state}>
      <GlobalDispatchProvider.Provider value={dispatch}>
        {children}
      </GlobalDispatchProvider.Provider>
    </GlobalStateProvider.Provider>
  );
}
