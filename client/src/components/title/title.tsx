import { Typography } from "@mui/material";
import React from "react";

export const Title = () => {
  return (
    <Typography
      variant="h4"
      fontFamily="Modak"
      py={4}
      color="primary"
      sx={{ userSelect: "none" }}
    >
      🐚 shelfi.sh
    </Typography>
  );
};
