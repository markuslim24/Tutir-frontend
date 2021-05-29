import { IconButton, makeStyles } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    width: "45%",
    padding: "2px 10px",
    border: "1px solid #c5c5c5",
    borderRadius: "3px",
    "&[data-focus=\"true\"]": {
      border: "2px solid #179e8b"
    }
  },
  searchInput: {
    flexGrow: 1,
    outline: "none",
    border: "none",
    padding: "0",
    fontSize: "1rem"
  },
  searchButton: {
    padding: "0"
  }
}));

export default function SearchBar() {
  const classes = useStyles();
  const [focussed, setFocussed] = useState(false);
  return (
    <div className={classes.searchContainer} data-focus={focussed}>
      <input type="text" className={classes.searchInput} placeholder="Search"
        onFocus={() => setFocussed(true)} onBlur={() => setFocussed(false)}/>
      <IconButton className={classes.searchButton}>
        <SearchIcon />
      </IconButton>
    </div>
  );
}