import { createContext, Dispatch, SetStateAction } from "react";

export const PreviouslyEnteredTitleContext = createContext(["", () => {}] as [
  string,
  Dispatch<SetStateAction<string>>
]);
