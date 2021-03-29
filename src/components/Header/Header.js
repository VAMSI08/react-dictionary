import React, { useCallback } from "react";

import { createMuiTheme, TextField, ThemeProvider } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import "./Header.css";
import countries from "../../data/category";

import { debounce } from "lodash";

const Header = ({
  category,
  setCategory,
  setWord,
  word,
  setMeanings,
  LightTheme,
}) => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: LightTheme ? "#000" : "#fff",
      },
      type: LightTheme ? "light" : "dark",
    },
  });

  const handleChange = (e) => {
    setCategory(e.target.value);
    setWord("");
    setMeanings([]);
  };

  const deb = useCallback(
    debounce((text) => setWord(text), 1000),
    []
  );

  const handleText = (text) => {
    deb(text);
  };

  return (
    <div className="header">
      <span className="title">{word ? word : "Dictionary App"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            variant="outlined"
            rounded={true}
            className="search"
            id="filled-basic"
            label="Search a Word"
            onChange={(e) => handleText(e.target.value)}
          />
          <TextField
            select
            rounded={true}
            variant="outlined"
            label="Language"
            value={category}
            onChange={(e) => handleChange(e)}
            className="select"
          >
            {countries.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
