import React, { createContext, useReducer } from 'react';
import { LabelledPDF } from '../types/responses';

export type State = {
    labelledPDFs: Record<string, LabelledPDF>;
};

interface AddPayload {
    type: 'ADD_LABELLED_PDF';
    labelledPDF: LabelledPDF;
    uid: string;
}

interface RemovePayload {
    type: 'REMOVE_LABELLED_PDF';
    uid: string;
}

export type Action =
    | AddPayload
    | RemovePayload;

export const initialState: State = {
    labelledPDFs: {},
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_LABELLED_PDF':
            return {
                ...state,
                labelledPDFs: { ...state.labelledPDFs, [action.uid]: action.labelledPDF },
            };
        case 'REMOVE_LABELLED_PDF': {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [action.uid]: _, ...rest } = state.labelledPDFs;
            const res =  {
                // ...state,
                labelledPDFs: rest
            }
            return res;
        }
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