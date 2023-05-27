import { useContext, useEffect, useState } from "react";
import { ResultsContext } from "../state/results";
import axios from "axios";
import { IGetClasses } from "../types/responses";
import { MessageContext } from "../state/message";

export const useClasses = () => {
    const [Loading, setLoading] = useState(false);
    const { dispatch, state: { classMapping } } = useContext(ResultsContext);
    const { msgAPI } = useContext(MessageContext)
    const setClasses = (action: Record<string, string>) => {
        dispatch({ type: 'SET_CLASS_MAPPINGS', classes: action })
    }
    const updateClasses = (errorMsg?: string, successMsg?: string) => {
        setLoading(true);
        axios.get<IGetClasses>("/classes")
            .then(({ data: { classes } }) => {
                setClasses(
                    Object.fromEntries(classes.map(label => [label.internalName, label.displayedName]))
                );
                if (successMsg)
                    msgAPI.success(successMsg);
            })
            .catch(err => {
                console.error(err);
                if (err?.code === 'ERR_NETWORK')
                    msgAPI.error('Network error: could not fetch class names');
                else
                    msgAPI.error(errorMsg);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        if (classMapping === undefined)
            updateClasses();
    }, []);

    return { updateClasses, Loading, setLoading, classes: classMapping ?? {}, setClasses }
}