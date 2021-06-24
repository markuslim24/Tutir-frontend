import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../store/slice/darkMode";
import { isPreferDarkMode } from "../store/slice/darkMode";

import {
  Typography,
  Switch,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Container,
  Button,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  header: { margin: "10px 0px" },
  darkMode: { margin: "10px 0px" },
  backButton: { margin: "10px 0px" },
}));

const Settings = () => {
  const dispatch = useDispatch();
  const isDarkModeEnabled = useSelector(isPreferDarkMode);
  const handleDarkModeSwitch = useCallback(() => {
    const tmp = !isDarkModeEnabled;
    dispatch(toggleDarkMode(tmp));
  }, [isDarkModeEnabled]);

  const router = useRouter();
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="md">
        <FormControl fullWidth={true}>
          <FormLabel>
            <Typography variant="h2" className={classes.header}>
              Settings
            </Typography>
          </FormLabel>
          <Paper className={classes.darkMode}>
            <FormControlLabel
              control={
                <Switch
                  checked={isDarkModeEnabled}
                  onChange={handleDarkModeSwitch}
                />
              }
              label="Dark Mode"
              labelPlacement="start"
            />
          </Paper>
        </FormControl>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          className={classes.backButton}
        >
          Back
        </Button>
      </Container>
    </>
  );
};

export default Settings;
