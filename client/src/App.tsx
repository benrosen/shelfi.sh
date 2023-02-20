import {
  DocumentScanner,
  Download,
  GitHub,
  Help,
  Search,
  Upload,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  ButtonGroup,
  Container,
  InputAdornment,
  Link,
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
    <Typography variant="h6" fontFamily="serif" py={2}>
      shelfi.sh
    </Typography>
  );
};

const Footer = () => {
  return (
    <Stack direction="row" justifyContent="center" py={1}>
      <Link href="https://github.com/benrosen/shelfi.sh">
        <GitHub />
      </Link>
    </Stack>
  );
};

const Menu = () => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Button variant="outlined" startIcon={<DocumentScanner />}>
        Scan
      </Button>
      <ButtonGroup variant="outlined">
        <Button startIcon={<Upload />}>Upload</Button>
        <Button endIcon={<Download />}>Download</Button>
      </ButtonGroup>
      <Button variant="outlined" startIcon={<Help />}>
        Help
      </Button>
    </Stack>
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
        return (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            label="Search your bookshelf"
          />
        );
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
                {parts.map((part) => {
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
        return <Paper elevation={4} sx={{ mt: 1 }} {...props} />;
      }}
    />
  );
};

function App() {
  return (
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      <Stack direction="column" height="100%">
        <Title />
        <Stack
          direction="column"
          py={2}
          spacing={2}
          flexGrow={1}
          justifyContent="center"
        >
          <Stack direction="row" justifyContent="center">
            <Typography variant="h1">
              <Icon />
            </Typography>
          </Stack>
          <SearchBar />
          <Menu />
        </Stack>
        <Footer />
      </Stack>
    </Container>
  );
}

export default App;
