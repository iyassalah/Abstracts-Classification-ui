import { decodeToken } from "./reducer";

export enum AuthStatus {
    LOGGED_IN, LOGGED_OUT
}

export interface ILoggedIn {
    status: AuthStatus.LOGGED_IN
    token: string;
    expiration: number;
    username: string;
    role: 'none' | 'admin';
}

interface ILoggedOut {
    status: AuthStatus.LOGGED_OUT;
}

export type AuthState = ILoggedIn | ILoggedOut;

export function getInitialState(): AuthState {
    const token = localStorage.getItem('token');
    if (token === null)
        return { status: AuthStatus.LOGGED_OUT }
    return {
        ...decodeToken(token)
    }
}

export type Logout = {
    type: 'LOGOUT',
}

export type Login = {
    type: 'LOGIN',
    payload: {
        token: string;
    }
}

export type CheckExpiry = {
    type: 'CHECK_EXPIRATION',
}

export type Action = Login | Logout | CheckExpiry;