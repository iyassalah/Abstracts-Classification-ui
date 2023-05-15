import React, { useReducer } from "react";
import { authReducer } from "./reducer";
import { AuthState, AuthStatus, getInitialState } from "./state";
import { createContext } from "react";

interface IAuthProviderProps {
  children: React.ReactNode;
}


export type AuthContextProps = {
  login(token: string): void;
  logout(): void;
  isTokenExpired(): boolean;
  state: AuthState;
}

export const AuthContext = createContext<AuthContextProps>(null as any);

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  const login = (token: string) => {
    dispatch({
      type: "LOGIN",
      payload: {
        token
      },
    });
    if (state.status === AuthStatus.LOGGED_IN)
      localStorage.setItem("token", state.token);
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("token");
  };

  const isTokenExpired = () => {
    dispatch({ type: "CHECK_EXPIRATION" });
    return state.status === AuthStatus.LOGGED_IN;
  };

  const initialState: AuthContextProps = { state, login, logout, isTokenExpired }

  return (
    <AuthContext.Provider value={initialState}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
