import { PanoramaFishEye } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grow,
  Paper,
  Stack,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { getIndexEntriesFromImage } from "../../functions/get-index-entries-from-image";
import { HelpSwitch } from "../help-switch";
import { useIndexEntries } from "../index-entries";
import { NavigationBar } from "../navigation-bar";
import { RoutePaths } from "../router";

export const Scanner = () => {
  const webcamReference = useRef<Webcam>(null);

  const [, setIndexEntries] = useIndexEntries();

  const [image, setImage] = useState<string | null>(null);

  const navigateTo = useNavigate();

  useEffect(() => {
    setImage(null);
  }, []);

  useEffect(() => {
    if (!image) {
      return;
    }

    getIndexEntriesFromImage({ image }).then((recognizedIndexEntries) => {
      setIndexEntries(recognizedIndexEntries);

      navigateTo(RoutePaths.Editor);
    });
  }, [image, setIndexEntries]);

  const [hasUserMedia, setHasUserMedia] = useState<boolean>();

  const captureImage = useCallback(() => {
    if (!webcamReference?.current) {
      return;
    }

    const screenshot = webcamReference.current.getScreenshot();

    setImage(screenshot);
  }, [webcamReference, setImage]);

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
            videoConstraints={{
              facingMode: "environment",
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
          // component={Link}
          onClick={captureImage}
          // to={RoutePaths.Editor}
          disabled={!hasUserMedia}
        >
          <PanoramaFishEye />
        </Button>
        <HelpSwitch />
      </Stack>
    </Stack>
  );
};
