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
    username: localStorage.getItem("username"),
    role: (localStorage.getItem("role") === 'admin' ? 'admin' : 'none'),
    expiration: +(localStorage.getItem("expiration") ?? 0),
    login() {
        return
    },
    logout() {
        return
    },
    isTokenExpired() {
        return true;
    },
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