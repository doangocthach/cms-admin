import "date-fns";
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
  makeStyles,
} from "@material-ui/core";
import "./createWorkspace.css";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    flexFlow: "column",
  },
}));
export default ({ open, handleClose }) => {
  const [state, setState] = useState({
    name: "",
    workspace: "",
    fromDate: new Date("2014-08-18T21:11:54"),
    toDate: new Date("2014-08-18T21:11:54"),
  });
  let history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // axios.post("/api/workspace/create", state);
    history.push("/campaigns");
  };
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
            placeholder="Enter your name workspace"
            label="Workspace Name"
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
          <br />
          <TextField
            className="workspace-form__email workspace-form__input"
            placeholder="Enter  email"
            label="Email"
            onChange={(e) => {
              setState({ ...state, workspace: e.target.value });
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="From"
              value={state.fromDate}
              onChange={(date) => {
                setState({ ...state, fromDate: date });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="To"
              value={state.toDate}
              onChange={(date) => {
                setState({ ...state, toDate: date });
              }}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          {/* <TextField
          className="workspace-form__email workspace-form__input"
          placeholder="Enter start of campaign"
          label="Email"
          onChange={(e) => {
            setState({ ...state, fromDate: e.target.value });
          }}
        />
        <TextField
          className="workspace-form__email workspace-form__input"
          placeholder="Enter end of campaign"
          label="Email"
          onChange={(e) => {
            setState({ ...state, toDate: e.target.value });
          }}
        /> */}
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
      </div>
    </Dialog>
  );
};
