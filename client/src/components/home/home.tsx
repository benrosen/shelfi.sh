import { Stack } from "@mui/material";
import { Menu } from "../menu";
import { SearchBar } from "../search-bar";

export const Home = () => {
  return (
    <Stack direction="column" spacing={1}>
      <SearchBar />
      <Menu />
    </Stack>
  );
};
