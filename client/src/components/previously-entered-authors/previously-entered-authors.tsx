import { PropsWithChildren } from "react";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { PreviouslyEnteredAuthorsContext } from "./previously-entered-authors-context";

export const PreviouslyEnteredAuthors = ({ children }: PropsWithChildren) => {
  const previouslyEnteredAuthorsState = useLocalStorage<string[]>({
    defaultValue: [],
    key: "previouslyEnteredAuthors",
  });

  return (
    <PreviouslyEnteredAuthorsContext.Provider
      value={previouslyEnteredAuthorsState}
    >
      {children}
    </PreviouslyEnteredAuthorsContext.Provider>
  );
};
