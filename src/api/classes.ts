import { useContext, useEffect, useState } from "react";
import { ResultsContext } from "../state/results";
import axios from "axios";
import { IGetCLasses } from "../types/responses";

export const useClasses = () => {
    const [Loading, setLoading] = useState(false);
    const { dispatch, state: { classMapping } } = useContext(ResultsContext);
    const setClasses = (action: Record<string, string>) => {
        dispatch({ type: 'SET_CLASS_MAPPINGS', classes: action })
    }
    const updateClasses = () => {
        setLoading(true);
        axios.get<IGetCLasses>("/classes")
            .then(({ data: { classes } }) => {
                setClasses(
                    Object.fromEntries(classes.map(label => [label.internalName, label.displayedName]))
                );
            })
            .catch(err => {
                console.error(err);
                // msgAPI.error('Could not retrieve classes');
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (classMapping === undefined)
            updateClasses();
    }, []);

    return { updateClasses, Loading, setLoading, classes: classMapping ?? {}, setClasses }
}