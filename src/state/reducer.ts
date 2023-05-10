import { createContext } from "react";
import { Action, State, initialState } from "./state";


const AuthContext = createContext<State>(initialState);

export const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};


export { AuthContext };
