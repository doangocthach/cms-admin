import React, { useState } from "react";
import axios from "../utils/axios";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import "./createWorkspace.css";
export default ({ open, handleClose }) => {
  const [state, setState] = useState({ name: "", email: "" });
  let history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/workspace/create", state);
    history.push("/workspaces");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Workspace</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter workspace name and owner email to create new workspace!
        </DialogContentText>
        {/* <FormControl> */}
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
          placeholder="Enter owner email"
          label="Email"
          onChange={(e) => {
            setState({ ...state, email: e.target.value });
          }}
        />
        {/* </FormControl> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          type="sumit"
          onClick={(e) => {
            handleClose();
            handleFormSubmit(e);
          }}
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
