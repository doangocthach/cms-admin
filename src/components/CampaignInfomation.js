import React, { useState, useRef, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import {
  Checkbox,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  makeStyles,
  Table,
  Paper,
  Popover,
  Typography,
  Button,
} from "@material-ui/core";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip, TableHead, TableSortLabel } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles";
// import EnhancedTableToolbar, {
//   getComparator,
// } from "./HeadTable";
import ZingChart from "zingchart-react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { campaignClient } from "../utils/graphClients";
import gql from "graphql-tag";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { convertDateNow } from "../utils/Date";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import Box from "@material-ui/core/Box";
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

const top = [
  {
    date: "20200727",
    numberOfUser: 2,
  },
  {
    date: "20200728",
    numberOfUser: 3,
  },
  {
    date: "20200729",
    numberOfUser: 6,
  },
  {
    date: "20200730",
    numberOfUser: 6,
  },
];

const bot = {
  pageviews: 168,
  users: 5,
  newUsers: 5,
  sessions: 11,
  avgSessionDuration: "2281.090909090909",
  bounceRate: "27.27272727272727",
  __typename: "PageGa",
};

const converMonth = (stringDate) => {
  let string;
  let Date = stringDate.substring(6, 8);
  let Month = stringDate.substring(4, 6);
  if (Month === "01") Month = "Jan";
  else if (Month === "02") Month = "Feb";
  else if (Month === "03") Month = "Mar";
  else if (Month === "04") Month = "Apr";
  else if (Month === "05") Month = "May";
  else if (Month === "06") Month = "Jun";
  else if (Month === "07") Month = "Jul";
  else if (Month === "08") Month = "Aug";
  else if (Month === "09") Month = "Sep";
  else if (Month === "10") Month = "Oct";
  else if (Month === "11") Month = "Nov";
  else if (Month === "12") Month = "Dec";
  return Month + " " + Date;
};
// const CardContentWrapper = ({ bot }) => {
//   return
// };
const convertSecondToMHSTime = (second) => {
  var measuredTime = new Date(null);
  measuredTime.setSeconds(second); // specify value of SECONDS
  var MHSTime = measuredTime.toISOString().substr(11, 8);
  return MHSTime;
};
export default function EnhancedTable(props) {
  console.log(props.match.params.campaignId);
  const classes = useStyles();
  const [campaigns, setCampaigns] = useState([]);
  const [reports, setReports] = useState([]);
  const [gaTraffic, setGaTraffic] = useState();
  const [gaTrafficByDay, setGaTrafficByDay] = useState([]);
  const [gaSources, setGaSources] = useState([]);
  const [totalAction, setTotalAction] = useState();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [dense] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState({});
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [state, setstate] = useState({
    config: {
      type: "line",
      "scale-y": {
        label: {
          text: "Users",
        },
      },
      "scale-x": {
        labels: top.map((e) => converMonth(e.date)),
        label: {
          text: "Time",
        },
      },
      series: [
        {
          values: top.map((e) => e.numberOfUser),
        },
      ],
    },
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
  const getGaTrafficByDay = gql`
    query($campaignId: String) {
      getGaTrafficByDay(campaignId: $campaignId) {
        date
        numberOfUser
      }
    }
  `;
  const getSources = gql`
    query($campaignId: String) {
      getSources(campaignId: $campaignId) {
        sourceMedium
        users
        newUsers
        sessions
        bounceRate
        pageviewsPerSession
        avgSessionDuration
      }
    }
  `;

  useEffect(() => {
    campaignClient
      .query({
        query: getGaTraffic,
        variables: { campaignId: props.match.params.campaignId },
      })
      .then((res) => {
        console.log(res.data.getGaTraffic);
        setGaTraffic(res.data.getGaTraffic);
      });
    campaignClient
      .query({
        query: getGaTrafficByDay,
        variables: { campaignId: props.match.params.campaignId },
      })
      .then((res) => {
        console.log(res.data.getGaTrafficByDay);
        setGaTrafficByDay(res.data.getGaTrafficByDay);
      });
    campaignClient
      .query({
        query: getSources,
        variables: { campaignId: props.match.params.campaignId },
      })
      .then((res) => {
        console.log(res.data.getSources);
        setGaSources(res.data.getSources);
      });
  }, []);

  const headCells = [
    {
      id: "pagePath",
      numeric: false,
      disablePadding: true,
      label: "Page",
    },
  ];

  return (
    <React.Fragment>
      <div>
        <div>{state.series}</div>
        <ZingChart ref={chart} data={state.config} series={state.series} />
      </div>
      <div className={classes.wrapperAnalytics}>
        {Object.entries(bot).map(
          ([key, value]) =>
            key !== "__typename" && (
              <Card className={classes.rootCard}>
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
    </React.Fragment>
  );
}

const converKey = (key, value) => {
  if (key === "bounceRate") {
    value = parseFloat(value).toFixed(2) + "%";
  } else if (key === "avgSessionDuration") {
    value = convertSecondToMHSTime(Math.round(parseFloat(value)));
  }
  return value;
};
