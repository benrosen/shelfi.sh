import { createContext, Dispatch, SetStateAction } from "react";
import { Bookshelf } from "../../types";

export const BookshelfContext = createContext([[], () => {}] as [
  Bookshelf,
  Dispatch<SetStateAction<Bookshelf>>
]);
