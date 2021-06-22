//imports
import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, logOut } from "../store/slice/auth";
import { useRouter } from "next/router";

//Materialui imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import StarIcon from "@material-ui/icons/Star";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryIcon from "@material-ui/icons/History";
import SearchBar from "./SearchBar";
import useStyles from "../styles/components/NavbarStyle";

//Navbar Component
export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //Retrieves isLoggedIn state
  const isAuthenticated = useSelector(isLoggedIn);

  const router = useRouter();

  //Handle logOut action
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    handleMenuClose();
    dispatch(logOut());
    router.push("/");
  }, [dispatch]);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLoginButton = () => {
    router.push("/login");
  };

  const handleSignUpButton = () => {
    router.push("/signUp");
  };

  const handleProfileButton = () => {
    handleMenuClose();
    router.push("/profile");
  };

  const handleSettingsButton = () => {
    router.push("/settings");
  };

  const menuId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileButton}>
        <AccountCircleIcon />
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <HistoryIcon />
        History
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon />
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = isAuthenticated ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show favourite videos" color="inherit">
          <StarIcon />
        </IconButton>
        <p>Favourites</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show profile of current user" color="inherit">
          <Avatar src="Avatar.png" className={classes.Avatar} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="show settings"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleSettingsButton}
        >
          <SettingsIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton aria-label="Logout" aria-haspopup="true" color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleLoginButton}>
        <p>Login</p>
      </MenuItem>
      <MenuItem onClick={handleSignUpButton}>
        <p>Sign Up</p>
      </MenuItem>
      <MenuItem onClick={handleSettingsButton}>
        <p>Settings</p>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link href="/">
            <a>
              <Image src="/logo.svg" height="24" width="80" layout="fixed" />
            </a>
          </Link>
          <div className={classes.grow} />
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated ? (
              <>
                <IconButton aria-label="show favourite videos" color="primary">
                  <StarIcon />
                </IconButton>
                <IconButton
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar src="Avatar.png" className={classes.Avatar} />
                </IconButton>
                <IconButton
                  edge="end"
                  className={classes.menuButton}
                  color="primary"
                  aria-label="show settings"
                  onClick={handleSettingsButton}
                >
                  <SettingsIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  aria-label="Signup"
                  variant="outlined"
                  color="secondary"
                  className={classes.squareButton}
                  onClick={handleSignUpButton}
                >
                  Sign up
                </Button>

                <Button
                  aria-label="Login"
                  variant="contained"
                  color="secondary"
                  className={classes.squareButton}
                  onClick={handleLoginButton}
                >
                  Login
                </Button>

                <IconButton
                  edge="end"
                  className={classes.menuButton}
                  color="secondary"
                  aria-label="show settings"
                  onClick={handleSettingsButton}
                >
                  <SettingsIcon />
                </IconButton>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="secondary"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
    </div>
  );
}
