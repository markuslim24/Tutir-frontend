//imports
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useCallback, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { login } from "../store/slice/auth";
import { client } from "../util/util";
import Link from "next/link";

//Mui imports
import IconButton from "@material-ui/core/IconButton";
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
  logoButton: {
    marginBottom: theme.spacing(2),
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: { maxWidth: 200 },
}));

//Login Page
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const classes = useStyles();

  //send email/password to backend for authentication
  const attemptLogin = useCallback(async () => {
    try {
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
          return alert("invalid_params");
        } else if (code === "auth_login_failed") {
          return alert("incorrect password or email");
        }
      }
      throw err;
    }
  }, [email, password, router, dispatch]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Link href="/">
          <IconButton
            edge="start"
            className={classes.logoButton}
            disableFocusRipple={true}
            disableRipple
          >
            <img src="logo.svg" className={classes.logo} />
          </IconButton>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={attemptLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">
                <Typography variant="body2" color="inherit">
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href="#">
                <Typography variant="body2" color="inherit">
                  "Don't have an account? Sign Up"
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </FormControl>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
