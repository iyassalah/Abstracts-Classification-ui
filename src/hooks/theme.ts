import { theme } from "antd";
import { ConfigProviderProps } from "antd/es/config-provider";
import { useState } from "react";

export function useTheme(darkMode = false) {
    const [DarkMode, setDarkMode] = useState(darkMode);
    const algorithm = DarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm;
    const themeProps: ConfigProviderProps = {
        theme: { algorithm }
    } as const;
    const toggle = () => {
        console.log(themeProps);
        setDarkMode(mode => !mode)
    };
    const { defaultSeed } = theme;
    const token = algorithm(defaultSeed);
    return { themeProps, toggle, token };
}


