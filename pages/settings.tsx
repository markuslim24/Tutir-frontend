import React from "react";
import Navbar from "../components/Navbar";

import {
  Typography,
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Container,
} from "@material-ui/core";

const Settings = () => {
  return (
    <>
      <Container maxWidth="md">
        <FormControl fullWidth={true}>
          <FormLabel>
            <Typography variant="h2">Settings</Typography>
          </FormLabel>
          <Paper>
            <FormControlLabel
              control={<Switch />}
              label="Dark Mode"
              labelPlacement="start"
            />
          </Paper>
        </FormControl>
      </Container>
    </>
  );
};

export default Settings;
