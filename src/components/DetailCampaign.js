import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Divider,
  makeStyles,
  colors,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  btn: {
    width: "100%",
    marginBottom: "1rem",
    color: "white",
    "&:hover": {
      color: "black",
    },
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
}));

export default ({ campaign, open, handleClose }) => {
  const classes = useStyles();
  const [enableTrading, setEnableTrading] = React.useState(false);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Campaign Detail</DialogTitle>
        <DialogContent>
          <h3>Name</h3>
          <p>{campaign.name}</p>
          <Divider />
          <h3>Workspace</h3>
          <p>{campaign.workspace}</p>
          <Divider />
          <br />

          {enableTrading ? (
            <Button
              className={classes.btn + " " + classes.dissable}
              onClick={() => setEnableTrading(false)}
            >
              Dissable Trading
            </Button>
          ) : (
            <Button
              className={classes.btn + " " + classes.trading}
              onClick={() => setEnableTrading(true)}
            >
              Enable Trading
            </Button>
          )}

          <Button className={classes.btn + " " + classes.leadboard}>
            Enable Leaderboard
          </Button>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const Leaderboard = () => {
  return <React.Fragment></React.Fragment>;
};
