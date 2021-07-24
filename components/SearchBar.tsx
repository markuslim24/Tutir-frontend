import { IconButton, Input, makeStyles, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";
import { client } from "../util/util";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    width: "45%",
    padding: "2px 10px",
    border: "1px solid",
    borderColor: theme.palette.background.default,
    backgroundColor: theme.palette.background.default,
    borderRadius: "3px",
    '&[data-focus="true"]': {
      border: "2px solid #179e8b",
    },
  },
  autoComplete: { display: "flex", width: "100%" },
  searchInput: {
    flexGrow: 1,
    outline: "none",
    border: "none",
    padding: "0",
    fontSize: "1rem",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    width: "100%",
  },
  searchButton: {
    padding: "0",
  },
}));
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
];

export default function SearchBar() {
  const classes = useStyles();
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState("");
  const [suggestedVids, setSuggestedVids] = useState([]);
  const router = useRouter();

  const handleChange = (e) => {
    setText(e.target.value);
    getQueryVideos(e.target.value);
  };

  const handleSubmit = () => {
    if (suggestedVids.length > 0) {
      router.push(`/video?id=${suggestedVids[0].id}`);
    }
  };

  const getQueryVideos = async (text) => {
    let res = await client.get(`/video/search?q=${text}`);
    setSuggestedVids(res.data.payload);
  };

  return (
    <div className={classes.searchContainer} data-focus={focused}>
      <Autocomplete
        className={classes.autoComplete}
        freeSolo
        disableClearable
        options={suggestedVids}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              disableUnderline: true,

              placeholder: "Search Video...",
            }}
            value={text}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        )}
      />
      <IconButton className={classes.searchButton} onClick={handleSubmit}>
        <SearchIcon />
      </IconButton>
    </div>
  );
}
