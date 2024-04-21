import { createContext, useState, ReactNode, useEffect } from "react";

export interface ITheme {
  isDarkMode: boolean;
  toggleTheme: () => void;
  themeClass: string;
}

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ITheme | null>(null);

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = (props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Retrieve the theme preference from localStorage
    const savedTheme = localStorage.getItem("isDarkMode");
    // If there's no theme preference saved, default to false (light mode)
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    // Save the current theme preference to localStorage
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    // Toggle the theme preference
    setIsDarkMode((previousValue: boolean) => !previousValue);
  };

  // Determine the theme class based on the theme preference
  const themeClass = isDarkMode ? "dark-theme" : "light-theme";

  const contextValue: ITheme = {
    isDarkMode,
    toggleTheme,
    themeClass,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
