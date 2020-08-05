import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  makeStyles,
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
import { Parser } from "json2csv";
import { campaignClient } from "../../../utils/graphClients";
import gql from "graphql-tag";
import { useStoreActions, useStoreState } from "easy-peasy";

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
  exportFile: {
    margin: "1rem",
    backgroundColor: "blue",
    color: "white",
  },
}));

const Leaderboard = ({ open, handleClose, data }) => {
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
        className={classes.exportFile}
        onClick={() => {
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
        Export all users to excel file
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

const EnableTrading = ({ open, handleClose, setEnableTrading, trackingId }) => {
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
          ga('create', '${trackingId}', 'auto');
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

export default ({
  campaign,
  trackingIdSelected,
  setEnableTrading,
  setOpenTradingDialog,
  openTradingDialog,
  leaders,
  setOpenLeaderboard,
  openLeaderboard,
  handleOpenTrading,
  handleViewTrading,
  open,
  handleClose,
}) => {
  const classes = useStyles();

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
          <p>{campaign.email}</p>
          <Divider />
          <br />
          {campaign && campaign.googleAnalytics ? (
            <Button
              className={classes.btn + " " + classes.dissable}
              onClick={() => {
                setOpenTradingDialog(true);
                handleViewTrading(campaign.googleAnalytics.trackingId);
              }}
            >
              View
            </Button>
          ) : (
            <Button
              className={classes.btn + " " + classes.trading}
              onClick={() => {
                handleOpenTrading();
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
        trackingId={trackingIdSelected}
      />
      <EnableTrading
        open={openTradingDialog}
        handleClose={setOpenTradingDialog}
        setEnableTrading={setEnableTrading}
        trackingId={trackingIdSelected}
      />
    </React.Fragment>
  );
};
