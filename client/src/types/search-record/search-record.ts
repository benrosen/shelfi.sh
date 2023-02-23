import { Book } from "../book";
import { IndexEntry } from "../index-entry";

export type SearchRecord = IndexEntry & Omit<Book, "indexEntries">;
