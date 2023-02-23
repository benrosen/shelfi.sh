import { IndexEntry } from "./index-entry";

export const isIndexEntry = (value: unknown): value is IndexEntry => {
  const maybeIndexEntry = value as IndexEntry;

  if (typeof (maybeIndexEntry.label as unknown) !== "string") {
    return false;
  }

  if (!Array.isArray(maybeIndexEntry.pages)) {
    return false;
  }

  return maybeIndexEntry.pages.every((page: unknown) => {
    return typeof page === "string";
  });
};
