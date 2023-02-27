import { Check } from "@mui/icons-material";
import { Box, Button, Divider, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthorsInput } from "../authors-input";
import { HelpSwitch } from "../help-switch";
import { IndexEntriesInput } from "../index-entries-input";
import { NavigationBar } from "../navigation-bar";
import { PreviouslyEnteredAuthors } from "../previously-entered-authors";
import { PreviouslyEnteredTitle } from "../previously-entered-title";
import { RoutePaths } from "../router";
import { TitleInput } from "../title-input";

export const Editor = () => {
  return (
    <Stack direction="column" spacing={2}>
      <NavigationBar />
      <IndexEntriesInput />
      <Divider />
      <PreviouslyEnteredTitle>
        <TitleInput />
      </PreviouslyEnteredTitle>
      <PreviouslyEnteredAuthors>
        <AuthorsInput />
      </PreviouslyEnteredAuthors>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ visibility: "hidden" }}>
          <HelpSwitch />
        </Box>
        <Button variant="contained" component={Link} to={RoutePaths.Home}>
          <Check />
        </Button>
        <HelpSwitch />
      </Stack>
    </Stack>
  );
};
