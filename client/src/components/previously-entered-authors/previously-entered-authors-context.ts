import { createContext, Dispatch, SetStateAction } from "react";

export const PreviouslyEnteredAuthorsContext = createContext([[], () => {}] as [
  string[],
  Dispatch<SetStateAction<string[]>>
]);
