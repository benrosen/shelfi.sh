import { ArrowBack, Close } from "@mui/icons-material";
import { TimelineDot } from "@mui/lab";
import { IconButton, Stack } from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutePaths } from "../router";

export const NavigationBar = () => {
  const location = useLocation();

  const isScanner = useMemo(() => {
    return location.pathname === RoutePaths.Scanner;
  }, [location.pathname]);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <IconButton
        component={Link}
        to={RoutePaths.Scanner}
        aria-hidden={isScanner}
        sx={{ visibility: isScanner ? "hidden" : "visible" }}
      >
        <ArrowBack />
      </IconButton>
      <Stack direction="row" justifyContent="center" spacing={1}>
        <TimelineDot color={isScanner ? "primary" : "grey"} />
        <TimelineDot color={isScanner ? "grey" : "primary"} />
      </Stack>
      <IconButton component={Link} to={RoutePaths.Home}>
        <Close />
      </IconButton>
    </Stack>
  );
};
