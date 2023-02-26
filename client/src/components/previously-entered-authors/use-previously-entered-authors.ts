import { useContext } from "react";
import { PreviouslyEnteredAuthorsContext } from "./previously-entered-authors-context";

export const usePreviouslyEnteredAuthors = () => {
  return useContext(PreviouslyEnteredAuthorsContext);
};
