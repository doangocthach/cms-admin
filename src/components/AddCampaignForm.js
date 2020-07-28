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
import { campaignClient } from "../utils/graphClients";
import gql from "graphql-tag";

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    flexFlow: "column",
  },
}));
export default ({ open, handleClose, campaigns, setCampaigns }) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    createdAt: "",
    expiredAt: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const mutation = gql`
      mutation(
        $name: String
        $email: String
        $createdAt: String
        $expiredAt: String
      ) {
        createCampaign(
          name: $name
          email: $email
          createdAt: $createdAt
          expiredAt: $expiredAt
        ) {
          _id
          name
          email
          googleAnalytics {
            trackingId
            isActive
          }
          createdAt
          expiredAt
          workspaceName
        }
      }
    `;
    const res = await campaignClient.mutate({
      mutation,
      variables: {
        name: state.name,
        email: state.email,
        createdAt: state.createdAt.toString(),
        expiredAt: state.expiredAt.toString(),
      },
    });
    const newCampaign = [...campaigns];
    newCampaign.pop();
    console.log(newCampaign);
    console.log([res.data.createCampaign, ...newCampaign]);
    setCampaigns([res.data.createCampaign, ...newCampaign]);
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
