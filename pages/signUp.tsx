import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { client } from "../util/util";
import axios from "axios";
import Alerts from "../components/Alerts";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="/">Tutir</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: { maxWidth: 200, marginBottom: theme.spacing(2) },
  link: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [isError, setIsError] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSignUpDisabled, setIsSignUpDisabled] = useState(false);
  const handleAlerts = (error: boolean, message: string) => {
    setIsAlert(true);
    setIsError(error);
    setAlertMessage(message);
  };
  const attemptSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return handleAlerts(true, "Passwords do not match");
    } else {
      try {
        setIsSignUpDisabled(true);
        let res = await client.post("/auth/signUp", {
          name: name,
          email: email,
          password: password,
        });
        handleAlerts(false, "Sign up is successful. You may now login.");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          let errCode = err.response?.data.code;
          if (errCode === "user_already_exists") {
            return handleAlerts(true, "Email already in use");
          }
        }
        throw err;
      } finally {
        setIsSignUpDisabled(false);
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Link href="/">
          <img src="logo.svg" className={classes.logo} />
        </Link>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={attemptSignUp}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="confirm-current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Alerts
            isAlert={isAlert}
            isError={isError}
            setIsAlert={setIsAlert}
            message={alertMessage}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSignUpDisabled}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item onClick={() => router.push("/login")}>
              <Typography
                variant="body2"
                color="primary"
                className={classes.link}
              >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
