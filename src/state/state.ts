export type State = {
    token: string | null;
    login(token: string): void;
    logout(): void;
}
export const initialState: State = {
    token: localStorage.getItem("token"),
    login() {
        return
    },
    logout() {
        return
    },
};

export type Logout = {
    type: 'LOGOUT',
    payload: Record<string, never>
}

export type Login = {
    type: 'LOGIN',
    payload: {
        token: string;
    }
}

export type Action = Login | Logout;