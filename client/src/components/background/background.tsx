import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import { ReactComponent as Svg } from "./background.svg";

export const Background = () => {
  const theme = useTheme();

  const { fillColor, opacity } = useMemo<{
    fillColor: string;
    opacity: number;
  }>(() => {
    return theme.palette.mode === "light"
      ? {
          fillColor: theme.palette.primary.main,
          opacity: 0.075,
        }
      : {
          fillColor: theme.palette.text.secondary,
          opacity: 0.025,
        };
  }, [theme.palette.mode]);

  return (
    <Svg
      style={{
        position: "fixed",
        maxHeight: "100vh",
        bottom: "-35vh",
        left: "-70vh",
        zIndex: -1,
        opacity,
      }}
      fill={fillColor}
    />
  );
};
