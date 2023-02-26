import { Container, Paper, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Background } from "../background";
import { Bookshelf } from "../bookshelf";
import { BrandMark } from "../brand-mark";
import { Footer } from "../footer";
import { Theme } from "../theme";

export const Root = () => {
  return (
    <Bookshelf>
      <Theme>
        <Background />
        <Stack direction="column" height="100vh">
          <Container maxWidth="sm" sx={{ flexGrow: 1 }}>
            <Stack direction="column" height="100%">
              <BrandMark />
              <Stack direction="column" flexGrow={1} justifyContent="start">
                <Paper elevation={8} sx={{ p: 2, borderRadius: 2 }}>
                  <Outlet />
                </Paper>
              </Stack>
            </Stack>
          </Container>
          <Container maxWidth="xl">
            <Footer />
          </Container>
        </Stack>
      </Theme>
    </Bookshelf>
  );
};
