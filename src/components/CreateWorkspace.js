import React, { useState } from "react";
import axios from "../utils/axios";
import Header from "./Header";
import "./createWorkspace.css";
export default () => {
  const [state, setState] = useState({ name: "", email: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let a = await axios.post("/create", state);
    console.log(a);
  };
  return (
    <React.Fragment>
      <div className="create-workspace-wrapper">
        <div className="main-content-wrapper">
          <h1>First, enter your email</h1>
          <p>
            Just one more email — a quick confirmation — before you say goodbye
            to overstuffed inboxes for good.
          </p>

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
        </div>
      </div>
    </React.Fragment>
  );
};
