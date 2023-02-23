import { IndexEntry } from "../index-entry";

export type Book = {
  authors: string[];
  title: string;
  indexEntries: IndexEntry[];
};
