import { createTheme } from "@mui/material";
import React from "react";
import { useDarkThemePreference } from "./use-dark-theme-preference";

export const usePreferredTheme = () => {
  const prefersDarkTheme = useDarkThemePreference();

  return React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkTheme ? "dark" : "light",
        },
      }),
    [prefersDarkTheme]
  );
};
