import React, { createContext, useReducer } from 'react';
import { LabelledPDF } from '../types/responses';
import { UploadFile } from 'antd';
import { ResultsFilters } from '../pages/results/results-table.component';
import { SearchedText } from '../hooks/text-search.hook';
import { IAbstract } from '../types/shared';

export type UploadedPDF = UploadFile<LabelledPDF> & { response: NonNullable<UploadFile<LabelledPDF>['response']> };

export type ResultsState = {
    fileList: UploadedPDF[];
    busy: boolean;
    resultsPage: { filters?: ResultsFilters, search?: SearchedText<IAbstract> },
};

interface IAddPayload {
    type: 'ADD_LABELLED_PDF';
    file: UploadedPDF;
    busy?: boolean;
}

interface IRemovePayload {
    type: 'REMOVE_LABELLED_PDF';
    uid: string;
    busy?: boolean;
}

interface ISetUploadFlag {
    type: 'SET_UPLOAD_FLAG';
    busy: boolean;
}

interface IUpdateFilters {
    type: 'SET_UPDATE_FILTERS';
    filters: NonNullable<ResultsState['resultsPage']>;
}

export type Action =
    | IAddPayload
    | IRemovePayload
    | ISetUploadFlag
    | IUpdateFilters;

export const initialState: ResultsState = {
    fileList: [],
    busy: false,
    resultsPage: {},
};

export const reducer = (state: ResultsState, action: Action): ResultsState => {
    const busy = !('busy' in action) || action?.busy === undefined ? state.busy : action.busy;
    switch (action.type) {
        case 'ADD_LABELLED_PDF':
            return { ...state, busy, fileList: [...state.fileList, action.file] }
        case 'REMOVE_LABELLED_PDF':
            return { ...state, busy, fileList: state.fileList.filter(e => e.uid !== action.uid) };
        case 'SET_UPLOAD_FLAG':
            return { ...state, busy }
        case 'SET_UPDATE_FILTERS':
            return { ...state, resultsPage: { ...state.resultsPage, ...action.filters } }
    }
};

export const ResultsContext = createContext<{ state: ResultsState; dispatch: React.Dispatch<Action> }>({
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