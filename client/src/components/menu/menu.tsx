import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { DownloadButton } from "../download-button";
import { HelpSwitch } from "../help-switch";
import { ScanButton } from "../scan-button";
import { UploadButton } from "../upload-button";

export const Menu = () => {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack direction={"row"} spacing={2}>
      <Stack direction="row" flexGrow={1}>
        <Stack direction="row">
          <UploadButton />
          <DownloadButton />
        </Stack>
        <Stack flexGrow={1} direction="row" justifyContent="center">
          <ScanButton />
        </Stack>
      </Stack>
      <HelpSwitch />
    </Stack>
  );
};
