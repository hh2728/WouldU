import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { search } from "../../api/searchAPI";

export default function SearchBar(props) {
  const { params, setParams, setSearchData } = props;
  const [searchQuery, setSearchQuery] = useState("");

  // Enter Key로 검색
  const handleOnKeyPress = e => {
    if (e.key === "Enter") {
      handleSubmitButton();
    }
  };

  const handleSubmitButton = () => {
    // console.log(searchQuery);

    setParams(prevState => ({ ...prevState, name: searchQuery, page: 1 }));
  };

  return (
    <Paper
      component="span"
      sx={{
        p: "2px",
        m: "20px",
        display: "flex",
        alignItems: "center",
        width: 800,
        height: 50,
        boxShadow: 2,
        border: 1,
        borderColor: "grey.600",
        backgroundColor: "#E9EBED",
      }}
    >
      <InputBase
        component="span"
        sx={{ flex: 1, fontSize: 20, ml: 2, fontFamily: "GD" }}
        placeholder="전통주 검색"
        inputProps={{ "aria-label": "input" }}
        onChange={e => setSearchQuery(e.target.value)}
        // onChange={e =>  setSearchQuery((prev) =>  (...prev, e.target.value ) )}
        onKeyPress={handleOnKeyPress}
      />
      <Divider component="span" sx={{ height: 28 }} orientation="vertical" />
      <IconButton
        component="span"
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => handleSubmitButton()}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
