import { GitHub } from "@mui/icons-material";
import { Link, Stack } from "@mui/material";
import React from "react";

export const Footer = () => {
  return (
    <Stack direction="row" justifyContent="end" py={1}>
      <Link href="https://github.com/benrosen/shelfi.sh" target="_blank">
        <GitHub />
      </Link>
    </Stack>
  );
};
