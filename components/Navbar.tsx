//imports
import React, { useCallback } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, logOut } from "../store/slice/auth";

//Materialui imports
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import MoreIcon from "@material-ui/icons/MoreVert";

//Navbar Component
const Navbar = () => {
  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    squareButton: {
      margin: theme.spacing(1),
    },
    Avatar: {
      margin: 0,
      padding: 0,
      width: "24px",
      height: "24px",
    },
    logoButton: {
      marginRight: theme.spacing(2),
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    logo: {
      maxWidth: 80,
      marginRight: "8px",
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: fade(theme.palette.common.black, 0.3),
      marginRight: theme.spacing(5),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        paddingRight: "250px",
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //Retrieves isLoggedIn state
  const isAuthenticated = useSelector(isLoggedIn);

  //Handle logOut action
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    handleMenuClose();
    dispatch(logOut());
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
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
        <IconButton aria-label="show new mails" color="inherit">
          <StarIcon />
        </IconButton>
        <p>Favourites</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show new notifications" color="inherit">
          <Avatar src="logo.png" className={classes.Avatar} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <SettingsIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search", variant: "outlined" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated ? (
              <>
                <IconButton aria-label="show favourite videos" color="inherit">
                  <StarIcon />
                </IconButton>
                <IconButton
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                >
                  <Avatar src="logo.png" className={classes.Avatar} />
                </IconButton>
                <IconButton
                  edge="end"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="show settings"
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
                >
                  Signup
                </Button>
                <Link href="/login">
                  <Button
                    href="/login"
                    aria-label="Login"
                    variant="contained"
                    color="secondary"
                    className={classes.squareButton}
                  >
                    Login
                  </Button>
                </Link>
                <IconButton
                  edge="end"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="show settings"
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
              color="inherit"
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
};

export default Navbar;
