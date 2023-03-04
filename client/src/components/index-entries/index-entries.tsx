import { PropsWithChildren, useState } from "react";
import { IndexEntry } from "../../types";
import { IndexEntriesContext } from "./index-entries-context";

export const IndexEntries = ({ children }: PropsWithChildren) => {
  const [value, setValue] = useState<IndexEntry[]>([]);

  return (
    <IndexEntriesContext.Provider value={[value, setValue]}>
      {children}
    </IndexEntriesContext.Provider>
  );
};
