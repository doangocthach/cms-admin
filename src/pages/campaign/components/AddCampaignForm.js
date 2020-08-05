import "date-fns";
import React, { useState } from "react";
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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { useStoreActions, useStoreState } from "easy-peasy";
const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    flexFlow: "column",
  },
}));
export default ({ handleClose, setState, state, handleFormSubmit, open }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <div>
        <DialogTitle id="form-dialog-title">Add Workspace</DialogTitle>
        <DialogContent className={classes.dialog}>
          <DialogContentText>
            Enter campaign name, workspace name when start campaign and end of
            campain!
          </DialogContentText>
          {/* <FormControl> */}
          <TextField
            className="workspace-form__name workspace-form__input"
            placeholder="Enter your campaign name"
            label="Campaign Name"
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
          <br />
          <TextField
            className="workspace-form__email workspace-form__input"
            placeholder="Enter Workspace Email"
            label="Workspace Email"
            onChange={(e) => {
              setState({ ...state, email: e.target.value });
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="From"
              value={state.createdAt}
              onChange={(date) => {
                setState({ ...state, createdAt: Date.parse(date) });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              autoOk
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="To"
              value={state.expiredAt}
              onChange={(date) => {
                setState({ ...state, expiredAt: Date.parse(date) });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
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
      </div>
    </Dialog>
  );
};
