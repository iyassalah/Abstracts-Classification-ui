import { createContext } from "react";
import { Action, State, initialState } from "./state";
import jwt_decode from "jwt-decode";


const AuthContext = createContext<State>(initialState);

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("token", action.payload.token);
      const decoded = jwt_decode(action.payload.token);
      if (!decoded || typeof decoded !== 'object' || !('exp' in decoded) || typeof decoded.exp !== 'number')
        throw Error('Invalid token: Missing expiry');
      return {
        ...state,
        token: action.payload.token,
        expiration: decoded.exp
      };
    }
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
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
