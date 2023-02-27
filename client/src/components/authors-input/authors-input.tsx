import { Autocomplete, Chip, TextField } from "@mui/material";
import { usePreviouslyEnteredAuthors } from "../previously-entered-authors";
import { useBookshelfAuthors } from "./use-bookshelf-authors";

// TODO try to get authors from title when value of title input changes
export const AuthorsInput = () => {
  const bookshelfAuthors = useBookshelfAuthors();

  const [previouslyEnteredAuthors, setPreviouslyEnteredAuthors] =
    usePreviouslyEnteredAuthors();

  return (
    <Autocomplete
      multiple
      options={bookshelfAuthors}
      freeSolo
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Authors" required />
      )}
      value={previouslyEnteredAuthors}
      onChange={(event, value) => {
        setPreviouslyEnteredAuthors(value ?? []);
      }}
    />
  );
};
