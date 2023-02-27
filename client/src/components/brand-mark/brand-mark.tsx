import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { RoutePaths } from "../router";

export const BrandMark = () => {
  return (
    <Typography
      variant="h4"
      fontFamily="Modak"
      py={4}
      color="primary"
      sx={{ userSelect: "none" }}
    >
      <Link
        to={RoutePaths.Home}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        🐚 shelfi.sh
      </Link>
    </Typography>
  );
};
