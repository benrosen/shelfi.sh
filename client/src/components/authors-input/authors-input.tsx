import { Autocomplete, Chip, TextField } from "@mui/material";

// TODO options = all authors from saved index
// TODO default value = last authors you put in
export const AuthorsInput = () => {
  return (
    <Autocomplete
      multiple
      options={[]}
      freeSolo
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Authors" required />
      )}
    />
  );
};
