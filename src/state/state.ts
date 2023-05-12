export type State = {
    token: string | null;
    expiration: number | null;
    username: string | null;
    role: 'none' | 'admin' | null;
    login(token: string): void;
    logout(): void;
    isTokenExpired(): boolean;
}
export const initialState: State = {
    token: localStorage.getItem("token"),
    login() {
        return
    },
    logout() {
        return
    },
    isTokenExpired() {
        return true;
    },
    expiration: null,
    username: null,
    role: null,
};

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