import React, { Component, useRef } from "react";
import { TextField, Button } from "@material-ui/core";

export default function useSearchBar({ setQuery }) {
  let searchRef = useRef();
  const handleSearch = () => {
    setQuery(searchRef.value);
  };
  return (
    <div className="search-input">
      <TextField
        className="search-input__input"
        label="Search"
        inputRef={(value) => (searchRef = value)}
      ></TextField>
      <Button
        className="search__button"
        onClick={() => {
          handleSearch();
        }}
      >
        <i className="fas fa-search "></i>
      </Button>
    </div>
  );
}
