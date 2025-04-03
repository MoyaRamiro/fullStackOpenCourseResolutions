/* eslint-disable indent */

import blogService from "./services/blogs";

import { createContext, useReducer } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SetLoggedUser":
      window.localStorage.setItem("loggedUser", JSON.stringify(action.payload));
      return action.payload;
    case "RemoveLoggedUser":
      window.localStorage.removeItem("loggedUser");
      return null;
    case "GetLoggedUser": {
      const loggedUser = window.localStorage.getItem("loggedUser");
      blogService.setToken(loggedUser.token);
      return JSON.parse(loggedUser);
    }
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
