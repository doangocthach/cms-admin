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
  useTheme,
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

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { campaignClient } from "../utils/graphClients";
import gql from "graphql-tag";
import Chart from "./Chart";
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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
export function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));
function descendingComparator(a, b, orderBy) {
  // console.log(b[orderBy]);

  if (parseFloat(b[orderBy]) < parseFloat(a[orderBy])) {
    return -1;
  }
  if (parseFloat(b[orderBy]) > parseFloat(a[orderBy])) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  // if (el.type === "date") {
  // }

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
const converStringToFloat = (string, fixNumber) => {
  return parseFloat(string);
};
const average = (currentValue, array, field) => {
  if (typeof currentValue === "string") {
    currentValue = converStringToFloat(currentValue, 2);
  }
  let total = 0;
  console.log(typeof currentValue);
  if (Array.isArray(array)) {
    array.forEach((element) => {
      total += converStringToFloat(element[`${field}`], 2);
    });
  }
  console.log(typeof total);
  return (currentValue / total) * 100;
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
const headCells = [
  {
    id: "sourceMedium",
    numeric: false,
    disablePadding: true,
    label: "Source",
  },
  {
    id: "users",
    numeric: false,
    disablePadding: true,
    label: "Users",
  },
  {
    id: "newUsers",
    numeric: false,
    disablePadding: false,
    label: "New Users",
  },
  {
    id: "sessions",
    numeric: false,
    disablePadding: false,
    label: "Sessions",
  },
  {
    id: "bounceRate",
    numeric: false,
    disablePadding: false,
    label: "Bounce Rate",
  },
  {
    id: "pageviewsPerSession",
    numeric: false,
    disablePadding: false,
    label: "Page/ Session",
  },
  {
    id: "avgSessionDuration",
    numeric: false,
    disablePadding: false,
    label: "Avg. Sesson  Duration",
  },
];
export default (props) => {
  console.log(props.match.params.campaignId);
  const classes = useStyles();
  const [campaigns, setCampaigns] = useState([]);
  const [reports, setReports] = useState([
    {
      sourceMedium: "(direct) / (none)",
      users: 6,
      newUsers: 6,
      sessions: 13,
      bounceRate: "23.076923076923077",
      pageviewsPerSession: "19.53846153846154",
      avgSessionDuration: "2255.0",
      __typename: "getSources",
    },
    {
      sourceMedium: "l.facebook.com / referral",
      users: 1,
      newUsers: 0,
      sessions: 1,
      bounceRate: "0.0",
      pageviewsPerSession: "2.0",
      avgSessionDuration: "1411.0",
      __typename: "getSources",
    },
  ]);
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
  const [dateSelected, setDateSelected] = useState({
    createdAt: new Date(),
    expiredAt: new Date(),
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
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = campaigns.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handlePage = (newPage) => {
    setPage(newPage);
  };
  const handleSearch = () => {
    setSearchValue(searchRef.value);
  };

  // useEffect(() => {
  //   campaignClient
  //     .query({
  //       query: getGaTraffic,
  //       variables: { campaignId: props.match.params.campaignId },
  //     })
  //     .then((res) => {
  //       console.log(res.data.getGaTraffic);
  //       setGaTraffic(res.data.getGaTraffic);
  //     });
  //   campaignClient
  //     .query({
  //       query: getGaTrafficByDay,
  //       variables: { campaignId: props.match.params.campaignId },
  //     })
  //     .then((res) => {
  //       console.log(res.data.getGaTrafficByDay);
  //       setGaTrafficByDay(res.data.getGaTrafficByDay);
  //     });
  //   campaignClient
  //     .query({
  //       query: getSources,
  //       variables: { campaignId: props.match.params.campaignId },
  //     })
  //     .then((res) => {
  //       console.log(res.data.getSources);
  //       setGaSources(res.data.getSources);
  //     });
  // }, []);

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
      <Chart />
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
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={campaigns.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(reports, getComparator(order, orderBy)).map(
                  (row, index) => {
                    const isItemSelected = isSelected(row.sourceMedium);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell
                          padding="checkbox"
                          onClick={(event) =>
                            handleClick(event, row.sourceMedium)
                          }
                        >
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {/* <Link to={`/campaign-infomation/${row._id}`}> */}
                          {row.sourceMedium}
                          {/* </Link> */}
                        </TableCell>
                        <TableCell align="left">
                          {Math.round(row.users)}
                          <span className={classes.miniContent}>
                            ({average(row.users, reports, "users").toFixed(2)}{" "}
                            %)
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          {row.newUsers}{" "}
                          <span className={classes.miniContent}>
                            (
                            {average(row.newUsers, reports, "newUsers").toFixed(
                              2
                            )}{" "}
                            %)
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          {row.sessions}{" "}
                          <span className={classes.miniContent}>
                            (
                            {average(row.sessions, reports, "sessions").toFixed(
                              2
                            )}{" "}
                            %)
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          {parseFloat(row.bounceRate).toFixed(2)}{" "}
                          <span className={classes.miniContent}>
                            (
                            {average(
                              row.bounceRate,
                              reports,
                              "bounceRate"
                            ).toFixed(2)}{" "}
                            %)
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          {parseFloat(row.pageviewsPerSession).toFixed(2)}{" "}
                          <span className={classes.miniContent}>
                            (
                            {average(
                              row.pageviewsPerSession,
                              reports,
                              "pageviewsPerSession"
                            ).toFixed(2)}{" "}
                            %)
                          </span>
                        </TableCell>
                        <TableCell align="left">
                          {convertSecondToMHSTime(
                            Math.round(parseFloat(row.avgSessionDuration))
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
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
