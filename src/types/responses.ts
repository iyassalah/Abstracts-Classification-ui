import { IAbstract } from "./shared";

export interface IResults {
    abstracts: IAbstract[];
}

export interface ILogin {
    message: string;
    access_token: string;
}

export type Probabilities = Record<string, [number, number]>;
export interface LabelledPDF {
    pred: Probabilities;
    inferred_abstract: string;
}


export interface ICreateAdmin {
    user_id: string;
}

export interface IGetCLasses {
    classes: Array<{internalName: string, displayedName: string}>;
}