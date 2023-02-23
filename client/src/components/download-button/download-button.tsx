import { Download } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";
import { saveAs } from "file-saver";
import React, { useCallback } from "react";
import { useBookshelf } from "../bookshelf";

export const DownloadButton = (props: IconButtonProps) => {
  const [books] = useBookshelf();

  const downloadBookshelfAsJson = useCallback(() => {
    const serializedBooks = JSON.stringify(books, null, 2);

    const blob = new Blob([serializedBooks], { type: "application/json" });

    saveAs(blob, "bookshelf.json");
  }, [books]);

  return (
    <IconButton onClick={downloadBookshelfAsJson} {...props}>
      <Download />
    </IconButton>
  );
};
