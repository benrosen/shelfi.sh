import { isIndexEntry } from "../index-entry";
import { Book } from "./book";

export const isBook = (value: unknown): value is Book => {
  const maybeBook = value as Book;

  if (typeof (maybeBook.title as unknown) !== "string") {
    return false;
  }

  if (!Array.isArray(maybeBook.authors)) {
    return false;
  }

  if (
    !maybeBook.authors.every((author: unknown) => {
      return typeof author === "string";
    })
  ) {
    return false;
  }

  return maybeBook.indexEntries.every(isIndexEntry);
};
