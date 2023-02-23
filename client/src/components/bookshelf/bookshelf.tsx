import { PropsWithChildren } from "react";
import { Bookshelf as BookshelfType } from "../../types";
import { BookshelfContext } from "./bookshelf-context";
import { useLocalStorage } from "./use-local-storage";

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
