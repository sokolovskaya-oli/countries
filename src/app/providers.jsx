"use client";

import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo-client";
import { ThemeProvider } from "styled-components";
import { useState, useEffect, createContext, useContext } from "react";
import { lightTheme, darkTheme } from "./styles/theme";
import GlobalStyle from "./styles/global";
import ThemeToggle from "../components/ThemeToggle";

const ThemeToggleContext = createContext();

export function useThemeToggle() {
  return useContext(ThemeToggleContext);
}

export function Providers({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setIsDark(true);
    else if (stored === "light") setIsDark(false);
    else setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <ApolloProvider client={client}>
      <ThemeToggleContext.Provider value={{ isDark, toggleTheme }}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyle />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </ThemeToggleContext.Provider>
    </ApolloProvider>
  );
}
