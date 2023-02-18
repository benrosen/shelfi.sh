import {
  Autocomplete,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import React, { Fragment } from "react";
import "./App.css";
import { useBookshelf } from "./use-bookshelf";

const Icon = () => {
  return <Fragment>🐚</Fragment>;
};

const Title = () => {
  return (
    <Typography variant="h6">
      <Icon /> shelfi.sh
    </Typography>
  );
};

const SearchBar = () => {
  const { indexEntries } = useBookshelf();

  return (
    <Autocomplete
      freeSolo
      fullWidth
      autoHighlight
      disableCloseOnSelect
      renderInput={(params) => {
        return <TextField {...params} label="Search your bookshelf" />;
      }}
      groupBy={(option) => {
        return option.title;
      }}
      options={indexEntries}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.label, inputValue, { insideWords: true });
        const parts = parse(option.label, matches);

        return (
          <li {...props}>
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Typography>
                {parts.map((part, index) => {
                  return (
                    <span style={{ fontWeight: part.highlight ? 700 : 400 }}>
                      {part.text}
                    </span>
                  );
                })}
              </Typography>
              <Typography>{option.pages.join(", ")}</Typography>
            </Stack>
          </li>
        );
      }}
      PaperComponent={(props) => {
        return <Paper elevation={0} variant="outlined" {...props} />;
      }}
    />
  );
};

function App() {
  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <Stack direction="column" py={1} spacing={1}>
        <Stack direction="row">
          <Title />
        </Stack>
        <Stack direction="row" py={2}>
          <SearchBar />
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
