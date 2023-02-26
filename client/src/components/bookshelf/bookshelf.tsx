import { PropsWithChildren } from "react";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { Bookshelf as BookshelfType } from "../../types";
import { BookshelfContext } from "./bookshelf-context";

export const Bookshelf = ({ children }: PropsWithChildren) => {
  const bookshelf = useLocalStorage<BookshelfType>({
    defaultValue: [],
    key: "bookshelf",
  });

  return (
    <BookshelfContext.Provider value={bookshelf}>
      {children}
    </BookshelfContext.Provider>
  );
};
