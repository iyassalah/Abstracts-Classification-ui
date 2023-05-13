import React, { useReducer } from "react";
import { AuthContext, authReducer, validateToken } from "./reducer";
import { State, initialState } from "./state";

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, validateToken(initialState));

  const login: State["login"] = (token) => {
    dispatch({
      type: "LOGIN",
      payload: {
        token
      },
    });
    console.log(state);
    if (state.expiration)
      localStorage.setItem("expiration", state.expiration.toString());
    if (state.username)
      localStorage.setItem("username", state.username);
    if (state.token)
      localStorage.setItem("token", state.token);
    if (state.role)
      localStorage.setItem("role", state.role);
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.removeItem("token");
  };

  const isTokenExpired = () => {
    dispatch({ type: "CHECK_EXPIRATION" });
    return state.expiration === null;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        expiration: null,
        isTokenExpired,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
