import { useMediaQuery } from "@mui/material";

export const useDarkThemePreference = () => {
  return useMediaQuery("(prefers-color-scheme: dark)");
};
