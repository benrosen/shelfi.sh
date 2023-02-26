import { Autocomplete, TextField } from "@mui/material";

// TODO options = all titles in the saved index
// TODO default value = last title that you put in
export const TitleInput = () => {
  return (
    <Autocomplete
      freeSolo
      options={[]}
      renderInput={(params) => <TextField {...params} required label="Title" />}
    />
  );
};
