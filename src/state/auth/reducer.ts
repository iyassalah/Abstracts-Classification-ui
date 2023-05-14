import { Action, AuthState, AuthStatus, ILoggedIn } from "./state";
import jwt_decode from "jwt-decode";


export function decodeToken(token: string): AuthState {

  const decoded = jwt_decode(token);
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
  const currTimeInSeconds = (new Date().getTime() / 1000);
  if (decoded.exp && decoded.exp < currTimeInSeconds) {
    return { status: AuthStatus.LOGGED_OUT };
  }

  let role: ILoggedIn['role'] = 'none';
  if ("role" in decoded && typeof decoded.role === "string" && (decoded.role === 'none' || decoded.role === 'admin'))
    role = decoded.role;

  return {
    status: AuthStatus.LOGGED_IN,
    expiration: decoded.exp,
    username: decoded.sub,
    token: token,
    role,
  };
}

export function validateToken(state: AuthState): AuthState {
  if (state.status === AuthStatus.LOGGED_OUT)
    return state;
  const currTimeInSeconds = (new Date().getTime() / 1000);
  if (state.expiration && state.expiration < currTimeInSeconds) {
    return { status: AuthStatus.LOGGED_OUT };
  } else {
    return state;
  }
}

export const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...decodeToken(action.payload.token) };
    case "LOGOUT":
      return { status: AuthStatus.LOGGED_OUT };
    case "CHECK_EXPIRATION":
      return validateToken(state);
  }
};

