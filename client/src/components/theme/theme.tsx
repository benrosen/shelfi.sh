import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { usePreferredTheme } from "./use-preferred-theme";

export const Theme = ({ children }: PropsWithChildren) => {
  const theme = usePreferredTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
