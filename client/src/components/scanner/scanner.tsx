import { CenterFocusStrong } from "@mui/icons-material";
import { Box, IconButton, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { HelpSwitch } from "../help-switch";
import { NavigationBar } from "../navigation-bar";
import { RoutePaths } from "../router";

export const Scanner = () => {
  return (
    <Stack direction="column" spacing={2}>
      <NavigationBar />
      <Paper variant="outlined" sx={{ overflow: "hidden", borderRadius: 2 }}>
        <Box height={320} p={1} />
      </Paper>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ visibility: "hidden" }}>
          <HelpSwitch />
        </Box>
        <IconButton component={Link} to={RoutePaths.Editor}>
          <CenterFocusStrong />
        </IconButton>
        <HelpSwitch />
      </Stack>
    </Stack>
  );
};
