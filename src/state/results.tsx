import React, { createContext, useReducer } from 'react';
import { LabelledPDF } from '../types/responses';
import { UploadFile } from 'antd';

type UploadedPDF = UploadFile<LabelledPDF> & { response: NonNullable<UploadFile<LabelledPDF>['response']> };

export type State = {
    fileList: UploadedPDF[];
};

interface AddPayload {
    type: 'ADD_LABELLED_PDF';
    file: UploadedPDF;
}

interface RemovePayload {
    type: 'REMOVE_LABELLED_PDF';
    uid: string;
}

export type Action =
    | AddPayload
    | RemovePayload;

export const initialState: State = {
    fileList: []
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_LABELLED_PDF':
            return { ...state, fileList: [...state.fileList, action.file] }
        case 'REMOVE_LABELLED_PDF':
            return { ...state, fileList: state.fileList.filter(e => e.uid !== action.uid) };
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