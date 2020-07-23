import React, { useState } from "react";
import axios from "../utils/axios";
import { useHistory } from "react-router-dom";
import { TextField, Button, Paper } from "@material-ui/core";
import "./createWorkspace.css";
export default ({ open }) => {
  const [state, setState] = useState({ name: "", email: "" });
  let history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/workspace/create", state);
    history.push("/");
  };
  return (
    <Paper className="main-content-wrapper">
      <h1>First, enter your email</h1>
      <form
        className="workspace-form"
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <TextField
          className="workspace-form__name workspace-form__input"
          placeholder="Enter your name workspace"
          label="Workspace Name"
          onChange={(e) => {
            setState({ ...state, name: e.target.value });
          }}
        />
        <br />
        <TextField
          className="workspace-form__email workspace-form__input"
          placeholder="Enter your email"
          label="Email"
          onChange={(e) => {
            setState({ ...state, email: e.target.value });
          }}
        />
        <Button type="submit">Create</Button>
      </form>
    </Paper>
  );
};
