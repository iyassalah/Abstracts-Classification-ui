import { IAbstract } from "./shared";

export interface IResults {
    abstracts: IAbstract[];
}

export interface ILogin {
    message: string;
    access_token: string;
}

export type Probabilities = Record<string, number>;
export interface LabelledPDF {
    pred: Probabilities;
    inferred_abstract: string;
}


export interface ICreateAdmin {
    user_id: string;
}

export interface IGetClasses {
    classes: Array<{ internalName: string, displayedName: string }>;
}

export interface IGetStats {
    tn: number;
    fn: number;
    tp: number;
    fp: number;
}