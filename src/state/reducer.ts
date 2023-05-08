type Action = "LOGIN_SUCCESS" | "LOGIN_FAILURE"

import axios from 'axios'

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginSuccessPayload {
  email: string;
  accessToken: string;
}

interface LoginFailurePayload {
  error: any;
}

type LoginSuccessAction = { type: 'LOGIN_SUCCESS'; payload: LoginSuccessPayload }
type LoginFailureAction = { type: 'LOGIN_FAILURE'; payload: LoginFailurePayload }
type LoginAction = LoginSuccessAction | LoginFailureAction


const initialState = {
    isLoggedIn: false,
    email: '',
    error: '',
    accessToken: localStorage.getItem('access_token') || '',
  } as const;
  
  // Define reducer function to handle state changes
  export const reducer = (state = initialState, action: LoginAction) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          email: action.payload.email,
          accessToken: action.payload.accessToken,
          error: '',
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isLoggedIn: false,
          email: '',
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
  