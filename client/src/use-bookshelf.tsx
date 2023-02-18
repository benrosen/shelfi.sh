import { useState } from "react";

interface Searchable {
  authors: string[];
  pages: string[];
  label: string;
  title: string;
}

export const useBookshelf = () => {
  const [indexEntries, setIndexEntries] = useState<Searchable[]>([
    {
      authors: ["Robert Nystrom"],
      pages: ["274"],
      label: "abstraction",
      title: "Game Programming Patterns",
    },
    {
      authors: [
        "Erich Gamma",
        "Richard Helm",
        "Ralph Johnson",
        "John Vlissides",
      ],
      pages: ["15", "16c", "359", "364", "365c"],
      label: "abstract class",
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    },
    {
      authors: ["Robert Nystrom"],
      pages: ["13", "65"],
      label: "abstract syntax tree",
      title: "Crafting Interpreters",
    },
  ]);

  return { indexEntries };
};
