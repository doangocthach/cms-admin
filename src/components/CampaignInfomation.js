import React, { useState, useRef, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { makeStyles, Typography, CardContent } from "@material-ui/core";

import SourceAnalytics from "./SourceAnalytics";
import Card from "@material-ui/core/Card";
import { campaignClient } from "../utils/graphClients";
import gql from "graphql-tag";
import Chart from "./Chart";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const converStringToFloat = (string, fixNumber) => {
  return parseFloat(string);
};

const convertSecondToMHSTime = (second) => {
  var measuredTime = new Date(null);
  measuredTime.setSeconds(second); // specify value of SECONDS
  var MHSTime = measuredTime.toISOString().substr(11, 8);
  return MHSTime;
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  typography: {
    padding: theme.spacing(2),
  },
  wrapperAnalytics: {
    margin: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
  },
  rootCard: {
    minWidth: "200px",
    margin: theme.spacing(2),
  },
}));

export default (props) => {
  const campaignId = props.match.params.campaignId;
  const classes = useStyles();

  const [gaTraffic, setGaTraffic] = useState([]);
  const [totalAction, setTotalAction] = useState();

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const [dateSelected, setDateSelected] = useState({
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).getTime(),
    expiredAt: new Date().getTime(),
  });

  const chart = React.createRef();
  let searchRef = useRef();

  const getGaTraffic = gql`
    query($campaignId: String) {
      getGaTraffic(campaignId: $campaignId) {
        pageviews
        users
        newUsers
        sessions
        avgSessionDuration
        bounceRate
      }
    }
  `;

  const handlePage = (newPage) => {
    setPage(newPage);
  };
  const handleSearch = () => {
    setSearchValue(searchRef.value);
  };

  useEffect(() => {
    campaignClient
      .query({
        query: getGaTraffic,
        variables: {
          campaignId: props.match.params.campaignId,
        },
      })
      .then((res) => {
        setGaTraffic(res.data.getGaTraffic);
      });
  }, []);

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={dateSelected.createdAt}
          onChange={(date) => {
            setDateSelected({ ...dateSelected, createdAt: Date.parse(date) });
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={dateSelected.expiredAt}
          onChange={(date) => {
            setDateSelected({ ...dateSelected, expiredAt: Date.parse(date) });
          }}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <Chart campaignId={campaignId} dateSelected={dateSelected} />
      <div className={classes.wrapperAnalytics}>
        {Object.entries(gaTraffic).map(
          ([key, value]) =>
            key !== "__typename" && (
              <Card className={classes.rootCard} key={key}>
                {
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {key}
                    </Typography>
                    <Typography variant="h5" component="h4">
                      {converKey(key, value)}
                    </Typography>
                  </CardContent>
                }
              </Card>
            )
        )}
      </div>
      <SourceAnalytics campaignId={campaignId} />
    </React.Fragment>
  );
};

const converKey = (key, value) => {
  if (key === "bounceRate") {
    value = parseFloat(value).toFixed(2) + "%";
  } else if (key === "avgSessionDuration") {
    value = convertSecondToMHSTime(Math.round(parseFloat(value)));
  }
  return value;
};
