import { useEffect } from "react";
const useBlock = (block: boolean, msg: string) => {
    useEffect(() => {
        if (!block)
            return;
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = msg;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [block]);
}

export default useBlock;
