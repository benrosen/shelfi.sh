import { Upload } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";
import React, { useCallback } from "react";
import { v4 as createUuid } from "uuid";
import { isBookshelf } from "../../types";
import { useBookshelf } from "../bookshelf";
import { FileInput } from "./file-input";

export const UploadButton = (props: IconButtonProps) => {
  const [, setBooks] = useBookshelf();

  const fileInputId = createUuid();

  const handleFileInputChangeEvent = useCallback((fileContent: string) => {
    const bookshelf = JSON.parse(fileContent);

    if (isBookshelf(bookshelf)) {
      setBooks(bookshelf);
    } else {
      //  display error notification

      console.error("not a valid bookshelf file");
    }
  }, []);

  return (
    <label htmlFor={fileInputId}>
      <FileInput
        accept="application/json"
        hidden
        id={fileInputId}
        onChange={handleFileInputChangeEvent}
      />
      <IconButton {...props} component="span">
        <Upload />
      </IconButton>
    </label>
  );
};
