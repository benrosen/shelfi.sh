import { Check } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { HelpSwitch } from "../help-switch";
import { NavigationBar } from "../navigation-bar";
import { RoutePaths } from "../router";

export const Editor = () => {
  return (
    <Stack direction="column">
      <NavigationBar />
      <Box bgcolor="blue" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ visibility: "hidden" }}>
          <HelpSwitch />
        </Box>
        <IconButton component={Link} to={RoutePaths.Home}>
          <Check />
        </IconButton>
        <HelpSwitch />
      </Stack>
    </Stack>
  );
};
