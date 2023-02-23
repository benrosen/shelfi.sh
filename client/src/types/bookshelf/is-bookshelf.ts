import { isBook } from "../book";
import { Bookshelf } from "./bookshelf";

export const isBookshelf = (value: unknown): value is Bookshelf => {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every(isBook);
};
