import {
  FormControlLabel,
  FormGroup,
  FormGroupProps,
  Switch,
} from "@mui/material";
import React from "react";

export const HelpSwitch = (props: FormGroupProps) => {
  return (
    <FormGroup {...props}>
      <FormControlLabel control={<Switch disabled />} label="Help" />
    </FormGroup>
  );
};
