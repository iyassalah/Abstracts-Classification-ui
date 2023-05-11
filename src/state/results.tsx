import React, { createContext, useReducer } from 'react';
import { LabelledPDF } from '../types/responses';

export type State = {
    labelledPDFs: LabelledPDF[];
};

export type Action =
    | { type: 'ADD_LABELLED_PDF'; labelledPDF: LabelledPDF };

export const initialState: State = {
    labelledPDFs: [],
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_LABELLED_PDF':
            return {
                ...state,
                labelledPDFs: [...state.labelledPDFs, action.labelledPDF],
            };
        default:
            return state;
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