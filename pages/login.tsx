//imports
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useCallback, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { login } from "../store/slice/auth";
import { client } from "../util/util";
import Link from "next/link";

//Mui imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl } from "@material-ui/core";
import Alerts from "../components/Alerts";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="/">
        <Typography color="inherit" display="inline">
          Tutir
        </Typography>
      </Link>{" "}
      {new Date().getFullYear()}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: { maxWidth: 200, marginBottom: theme.spacing(2), cursor: "pointer" },
  link: {
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
}));

//Login Page
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleAlerts = (message: string) => {
    setIsAlert(true);
    setAlertMessage(message);
  };

  //send email/password to backend for authentication
  const attemptLogin = async () => {
    try {
      setIsLoginDisabled(true);
      let res = await client.post("/auth/login", {
        email: email,
        password: password,
      });
      dispatch(login(res.data.payload));
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let code = err.response?.data.code;
        if (code === "invalid_params") {
          return handleAlerts("invalid params!");
        } else if (code === "auth_login_failed") {
          return handleAlerts("Incorrect username/password!");
        }
      }
      throw err;
    } finally {
      setIsLoginDisabled(false);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Link href="/">
            <img src="logo.svg" className={classes.logo} />
          </Link>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <FormControl className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Alerts
              isAlert={isAlert}
              isError={true}
              setIsAlert={setIsAlert}
              message={alertMessage}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoginDisabled}
              className={classes.submit}
              onClick={attemptLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#">
                  <Typography
                    variant="body2"
                    color="primary"
                    className={classes.link}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item onClick={() => router.push("/signUp")}>
                <Typography
                  variant="body2"
                  color="primary"
                  className={classes.link}
                >
                  "Don't have an account? Sign Up"
                </Typography>
              </Grid>
            </Grid>
          </FormControl>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
