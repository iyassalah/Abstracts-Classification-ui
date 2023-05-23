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
    resultsPage: {
        filters?: ResultsFilters,
        search?: SearchedText<IAbstract>,
        thresh?: number,
        classCnt?: number,
    },
    classMapping?: Record<string, string>;
};

interface IAddPayload {
    type: 'SET_LABELLED_PDF';
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

interface ISetClassMappings {
    type: 'SET_CLASS_MAPPINGS';
    unset?: boolean;
    classes: Record<string, string>;
}

interface IUpdateFilters {
    type: 'SET_UPDATE_FILTERS';
    filters: NonNullable<ResultsState['resultsPage']>;
}

export type Action =
    | IAddPayload
    | IRemovePayload
    | ISetUploadFlag
    | ISetClassMappings
    | IUpdateFilters;

export const initialState: ResultsState = {
    fileList: [],
    busy: false,
    resultsPage: {
        classCnt: 5,
        thresh: 0.9,
    },
};

export const reducer = (state: ResultsState, action: Action): ResultsState => {
    const busy = !('busy' in action) || action?.busy === undefined ? state.busy : action.busy;
    switch (action.type) {
        case 'SET_LABELLED_PDF': {
            const { fileList } = state;
            const index = fileList.findIndex(file => action.file.uid === file.uid);
            if (index === -1)
                return { ...state, busy, fileList: [...fileList, action.file] }
            return {
                ...state,
                busy,
                fileList: fileList.map((file, i) => i === index ? file : action.file)
            }
        }
        case 'REMOVE_LABELLED_PDF':
            return { ...state, busy, fileList: state.fileList.filter(e => e.uid !== action.uid) };
        case 'SET_UPLOAD_FLAG':
            return { ...state, busy }
        case 'SET_UPDATE_FILTERS':
            return { ...state, resultsPage: { ...state.resultsPage, ...action.filters } }
        case 'SET_CLASS_MAPPINGS':
            return { ...state, classMapping: { ...(action.unset ? {} : state.classMapping), ...action.classes } }
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