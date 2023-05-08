import { IAbstract } from "./shared";

export interface IResults {
    abstracts: IAbstract[];
}

export interface ILogin {
    message: string;
    access_token: string;
}
