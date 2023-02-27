import { PanoramaFishEye } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grow,
  Paper,
  Stack,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";
import { HelpSwitch } from "../help-switch";
import { NavigationBar } from "../navigation-bar";
import { RoutePaths } from "../router";

export const Scanner = () => {
  const webcamReference = useRef<Webcam>(null);

  const [image, setImage] = useState<string | null>(null);

  const [hasUserMedia, setHasUserMedia] = useState<boolean>();

  const captureImage = useCallback(() => {
    if (!webcamReference?.current) {
      return;
    }

    setImage(webcamReference.current.getScreenshot());
  }, [webcamReference]);

  return (
    <Stack direction="column" spacing={2}>
      <NavigationBar />
      {!hasUserMedia && (
        <Stack direction="column" alignItems="center">
          <CircularProgress />
        </Stack>
      )}
      <Grow in={hasUserMedia}>
        <Paper
          elevation={4}
          sx={{
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          <Webcam
            autoPlay
            ref={webcamReference}
            style={{
              display: hasUserMedia ? "block" : "none",
              width: "100%",
            }}
            onUserMedia={() => {
              // TODO refactor this hacky timeout
              // mitigate video loading duration variance
              setTimeout(() => setHasUserMedia(true), 1500);
            }}
            onUserMediaError={() => {
              setHasUserMedia(false);
            }}
          />
        </Paper>
      </Grow>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box
          sx={{
            visibility: "hidden",
          }}
        >
          <HelpSwitch />
        </Box>
        <Button
          variant="contained"
          component={Link}
          to={RoutePaths.Editor}
          disabled={!hasUserMedia}
        >
          <PanoramaFishEye />
        </Button>
        <HelpSwitch />
      </Stack>
    </Stack>
  );
};
