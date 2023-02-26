import { useMemo } from "react";
import { useBookshelf } from "../bookshelf";

export const useBookshelfTitles = () => {
  const [bookshelf] = useBookshelf();

  return useMemo(() => {
    return [
      ...new Set(
        bookshelf.map((book) => {
          return book.title;
        })
      ),
    ].sort();
  }, [bookshelf]);
};
