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
  Card,
  Typography,
} from "@material-ui/core";
import "./highlight.css";
import Highlight from "react-highlight.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import json2csv, { Parser } from "json2csv";
const useStyles = makeStyles((theme) => ({
  btn: {
    width: "100%",
    marginBottom: "1rem",
    color: "white",
    "&:hover": {
      color: "black",
    },
    marginTop: "1rem",
    minWidth: "200px",
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
  table: {
    width: "100%",
  },
}));

const leaders = require("./a.json");

const Leaderboard = ({ open, handleClose, data }) => {
  // const [leaders] = React.useState(data);
  // console.log(leaders);
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="form-dialog-title"
      className="VCL"
    >
      <DialogTitle id="form-dialog-title">Leaderboard</DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((player, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {player.name}
                    </TableCell>
                    <TableCell align="right">{player.score}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <Button
        onClick={() => {
          const keyNames = Object.keys(data[0]);
          const filename = "leaderboard.csv";
          const parser = new Parser();
          const csv = parser.parse(data);
          var blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
          });
          if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
          } else {
            var link = document.createElement("a");
            if (link.download !== undefined) {
              var url = URL.createObjectURL(blob);
              link.setAttribute("href", url);
              link.setAttribute("download", filename);
              link.style.visibility = "hidden";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }
        }}
      >
        Export Excel File
      </Button>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => {
            handleClose(false);
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EnableTrading = ({ open, handleClose, setEnableTrading }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Your Tracking Key</DialogTitle>
      <DialogContent>
        <b>Copy this:</b>
        <Highlight language="javascript">{`<script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-00000000-1', 'auto');
          ga('send', 'pageview');
        </script>
        `}</Highlight>
        <Button
          className={classes.btn + " " + classes.dissable}
          onClick={() => {
            setEnableTrading(false);
            handleClose();
          }}
        >
          Dissable
        </Button>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ({ campaign, open, handleClose }) => {
  const classes = useStyles();
  const [enableTrading, setEnableTrading] = React.useState(false);
  const handleCloseTrading = () => {
    setEnableTrading(false);
  };
  const [openTradingDialog, setOpenTradingDialog] = React.useState(false);
  const [openLeaderboard, setOpenLeaderboard] = React.useState(false);
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
              onClick={() => {
                setOpenTradingDialog(true);
              }}
            >
              View
            </Button>
          ) : (
            <Button
              className={classes.btn + " " + classes.trading}
              onClick={() => {
                setEnableTrading(true);
                setOpenTradingDialog(true);
              }}
            >
              Enable Trading
            </Button>
          )}

          <Button
            className={classes.btn + " " + classes.leadboard}
            onClick={() => {
              setOpenLeaderboard(true);
            }}
          >
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
      <Leaderboard
        open={openLeaderboard}
        handleClose={setOpenLeaderboard}
        data={leaders}
      />
      <EnableTrading
        open={openTradingDialog}
        handleClose={setOpenTradingDialog}
        setEnableTrading={setEnableTrading}
      />
    </React.Fragment>
  );
};
