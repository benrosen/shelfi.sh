import { AddAPhoto } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { RoutePaths } from "../router";

export const ScanButton = () => {
  return (
    <IconButton component={Link} to={RoutePaths.Scanner}>
      <AddAPhoto />
    </IconButton>
  );
};
