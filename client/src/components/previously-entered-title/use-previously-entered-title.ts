import { useContext } from "react";
import { PreviouslyEnteredTitleContext } from "./previously-entered-title-context";

export const usePreviouslyEnteredTitle = () => {
  return useContext(PreviouslyEnteredTitleContext);
};
