import { createContext } from "react";
import { Action, State, initialState } from "./state";
import jwt_decode from "jwt-decode";

const AuthContext = createContext<State>(initialState);

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("token", action.payload.token); //TODO: this is must be removed from here .
      const decoded = jwt_decode(action.payload.token);
      if (
        !decoded ||
        typeof decoded !== "object" ||
        !("exp" in decoded) ||
        typeof decoded.exp !== "number" ||
        !("sub" in decoded) ||
        typeof decoded.sub !== "string"
      ) {
        throw Error("Invalid token");
      }
      let role: State['role'] = 'none';
      if ("role" in decoded && typeof decoded.role === "string" && (decoded.role === 'none' || decoded.role === 'admin'))
        role = decoded.role;
      return {
        ...state,
        token: action.payload.token,
        expiration: decoded.exp,
        username: decoded.sub,
        role,
      };
    }
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        username: null,
      };
    case "CHECK_EXPIRATION":
      if (state.expiration && state.expiration < new Date().getTime()) {
        return {
          ...state,
          token: null,
          expiration: null,
        };
      } else {
        return state;
      }
  }
};

export { AuthContext };
