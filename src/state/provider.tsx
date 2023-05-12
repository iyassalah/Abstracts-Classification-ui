import React, { useReducer, useState } from "react";
import { AuthContext, authReducer } from "./reducer";
import { State, initialState } from "./state";

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login: State["login"] = (token) => {
    dispatch({
      type: "LOGIN",
      payload: {
        token,
      },
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
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
