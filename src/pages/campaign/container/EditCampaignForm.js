import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Divider,
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  btn: {
    width: "100%",
    marginBottom: "1rem",
    color: "white",
    "&:hover": {
      color: "black",
    },
    background: "#3f51b5",
  },
  trading: {
    backgroundColor: "blue",
  },
  leadboard: {
    backgroundColor: "green",
  },
  dissable: {
    backgroundColor: "red",
  },
  flex: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "1rem",
  },
  content: {
    minWidth: "300px",
  },
  input: {
    width: "100%",
  },
}));

export default ({ campaign, open, handleClose }) => {
  const classes = useStyles();
  // const [state, setstate] = React.useState({
  //   name: "",
  //   workspace: "",
  //   date: new Date(),
  // });
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Campaign </DialogTitle>
        <DialogContent className={classes.content}>
          <h3>Campaign Name</h3>
          <TextField
            className={classes.input}
            defaultValue={campaign.name}
            // onChange={(e, value) => {}}
          ></TextField>
          <Divider />
          <h3>Workspace Email </h3>
          <TextField
            type="email"
            className={classes.input}
            defaultValue={campaign.workspace}
          ></TextField>
          <Divider />
          <br />
          <Button className={classes.btn}>Edit</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
