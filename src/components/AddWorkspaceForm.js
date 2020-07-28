import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import "./createWorkspace.css";
import { workspaceClient } from "../utils/graphClients";
import gql from "graphql-tag";

export default ({ open, handleClose, workspaces, setWorkspace }) => {
  const [state, setState] = useState({ name: "", email: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const mutation = gql`
      mutation($name: String, $email: String) {
        createWorkspace(name: $name, email: $email) {
          id
          name
          email
          createdAt
        }
      }
    `;
    const res = await workspaceClient.mutate({ mutation, variables: state });
    const newWorkspace = [...workspaces];
    newWorkspace.pop();
    setWorkspace([res.data.createWorkspace, ...newWorkspace]);
  };
  const useStyles = makeStyles((theme) => ({
    dialog: {
      display: "flex",
      flexFlow: "column",
    },
  }));
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Workspace</DialogTitle>
      <DialogContent className={classes.dialog}>
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
          type="email"
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
