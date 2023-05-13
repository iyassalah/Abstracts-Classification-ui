import { createContext } from "react";
import { Action, State, initialState } from "./state";
import jwt_decode from "jwt-decode";

const AuthContext = createContext<State>(initialState);

export function validateToken(state: State): State {
  const currTimeInSeconds = (new Date().getTime() / 1000);
  if (state.expiration && state.expiration < currTimeInSeconds) {
    return {
      ...state,
      token: null,
      expiration: null,
      username: null,
      role: 'none',
    };
  } else {
    return state;
  }
}

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN": {
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
      return {
        ...state,
        token: null,
        username: null,
        role: null,
        expiration: null,
      };
    case "CHECK_EXPIRATION":
      return validateToken(state);
  }
};

export { AuthContext };
