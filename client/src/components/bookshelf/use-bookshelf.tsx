import { useContext } from "react";
import { BookshelfContext } from "./bookshelf-context";

export const useBookshelf = () => {
  return useContext(BookshelfContext);
};
