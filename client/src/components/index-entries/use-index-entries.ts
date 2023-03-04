import { useContext } from "react";
import { IndexEntriesContext } from "./index-entries-context";

export const useIndexEntries = () => {
  return useContext(IndexEntriesContext);
};
