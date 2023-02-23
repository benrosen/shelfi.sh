import { Search } from "@mui/icons-material";
import {
  Autocomplete,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import React, { useMemo } from "react";
import { SearchRecord } from "../../types";
import { useBookshelf } from "../bookshelf";

export const SearchBar = () => {
  const [bookshelf] = useBookshelf();

  const searchRecords = useMemo<SearchRecord[]>(() => {
    return bookshelf.flatMap((book) => {
      return book.indexEntries.map((indexEntry) => {
        return {
          authors: book.authors,
          title: book.title,
          ...indexEntry,
        };
      });
    });
  }, [bookshelf]);

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
        return option.title as string;
      }}
      options={searchRecords}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.label, inputValue, { insideWords: true });
        const parts = parse(option.label, matches);

        return (
          <li {...props}>
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Typography>
                {parts.map((part, index) => {
                  return (
                    <span
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
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
        return <Paper elevation={24} sx={{ mt: 1 }} {...props} />;
      }}
    />
  );
};
