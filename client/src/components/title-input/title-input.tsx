import { Autocomplete, TextField } from "@mui/material";
import { usePreviouslyEnteredTitle } from "../previously-entered-title";
import { useBookshelfTitles } from "./use-bookshelf-titles";

export const TitleInput = () => {
  const bookshelfTitles = useBookshelfTitles();

  const [previouslyEnteredTitle, setPreviouslyEnteredTitle] =
    usePreviouslyEnteredTitle();

  return (
    <Autocomplete
      freeSolo
      options={bookshelfTitles}
      renderInput={(params) => <TextField {...params} required label="Title" />}
      value={previouslyEnteredTitle}
      onChange={(event, value) => {
        setPreviouslyEnteredTitle(value ?? "");
      }}
    />
  );
};
