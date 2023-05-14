import React, { createContext, useReducer } from 'react';
import { LabelledPDF } from '../types/responses';
import { UploadFile } from 'antd';

export type UploadedPDF = UploadFile<LabelledPDF> & { response: NonNullable<UploadFile<LabelledPDF>['response']> };

export type State = {
    fileList: UploadedPDF[];
    busy: boolean;
};

interface IAddPayload {
    type: 'ADD_LABELLED_PDF';
    file: UploadedPDF;
    flag?: boolean;
}

interface IRemovePayload {
    type: 'REMOVE_LABELLED_PDF';
    uid: string;
    flag?: boolean;
}

interface ISetUploadFlag {
    type: 'SET_UPLOAD_FLAG';
    flag: boolean;
}

export type Action =
    | IAddPayload
    | IRemovePayload
    | ISetUploadFlag;

export const initialState: State = {
    fileList: [],
    busy: false,
};

export const reducer = (state: State, action: Action): State => {
    const busy = action?.flag === undefined ? state.busy : action.flag;
    switch (action.type) {
        case 'ADD_LABELLED_PDF':
            return { ...state, busy, fileList: [...state.fileList, action.file] }
        case 'REMOVE_LABELLED_PDF':
            return { ...state, busy, fileList: state.fileList.filter(e => e.uid !== action.uid) };
        case 'SET_UPLOAD_FLAG':
            return { ...state, busy }
    }
};

export const ResultsContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
    state: initialState,
    dispatch: () => null,
});


interface IResultsProviderProps {
    children: React.ReactNode;
}

export const ResultsProvider = ({ children }: IResultsProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ResultsContext.Provider value={{ state, dispatch }}>
            {children}
        </ResultsContext.Provider>
    );
};