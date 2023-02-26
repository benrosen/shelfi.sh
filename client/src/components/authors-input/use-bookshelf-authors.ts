import { useMemo } from "react";
import { useBookshelf } from "../bookshelf";

export const useBookshelfAuthors = () => {
  const [bookshelf] = useBookshelf();

  return useMemo(() => {
    return [
      ...new Set(
        bookshelf.flatMap((book) => {
          return book.authors;
        })
      ),
    ].sort();
  }, [bookshelf]);
};
