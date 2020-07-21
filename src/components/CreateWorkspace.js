import React, { useState } from "react";
import "./CreateWorkspace.scss";
import axios from "../utils/axios";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

export default function CreateWorkspace() {
  const [state, setState] = useState({ name: "", email: "" });
  const [formStatus, setFormStatus] = useState(false);

  const handleOpenForm = () => {
    setFormStatus(!formStatus);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let a = await axios.post("/create", state);
    console.log(a);
  };
  return (
    <>
      <button
        className="btn btn-create-workspace"
        onClick={() => {
          handleOpenForm();
        }}
      >
        {" "}
        Create a Workspace
      </button>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      {formStatus && (
        <form
          className="workspace-form"
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
        >
          <input
            className="workspace-form__name"
            placeholder="Enter your name workspace"
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
          <br />
          <input
            className="workspace-form__email"
            placeholder="Enter your email"
            onChange={(e) => {
              setState({ ...state, email: e.target.value });
            }}
          />
          <button type="submit">Create</button>
        </form>
      )}
    </>
  );
}
