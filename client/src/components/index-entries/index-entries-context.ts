import { createContext, Dispatch, SetStateAction } from "react";
import { IndexEntry } from "../../types";

export const IndexEntriesContext = createContext<
  [IndexEntry[], Dispatch<SetStateAction<IndexEntry[]>>]
>([[], () => {}]);
