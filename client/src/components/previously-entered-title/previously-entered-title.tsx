import { PropsWithChildren } from "react";
import { useLocalStorage } from "../../hooks/use-local-storage";
import { PreviouslyEnteredTitleContext } from "./previously-entered-title-context";

export const PreviouslyEnteredTitle = ({ children }: PropsWithChildren) => {
  const previouslyEnteredTitleState = useLocalStorage<string>({
    defaultValue: "",
    key: "previouslyEnteredTitle",
  });

  return (
    <PreviouslyEnteredTitleContext.Provider value={previouslyEnteredTitleState}>
      {children}
    </PreviouslyEnteredTitleContext.Provider>
  );
};
