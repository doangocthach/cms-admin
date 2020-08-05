import React, { useState, useEffect } from "react";
import {
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  makeStyles,
  Table,
  Paper,
} from "@material-ui/core";
import { TableHead, TableSortLabel } from "@material-ui/core";

function descendingComparator(a, b, orderBy) {
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
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

const converStringToFloat = (string, fixNumber) => {
  return parseFloat(string);
};
const average = (currentValue, array, field) => {
  if (typeof currentValue === "string") {
    currentValue = converStringToFloat(currentValue, 2);
  }
  let total = 0;
  if (Array.isArray(array)) {
    array.forEach((element) => {
      total += converStringToFloat(element[`${field}`], 2);
    });
  }
  return (currentValue / total) * 100;
};

export function EnhancedTableHead(props) {
  const {
    classes,
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    // rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.tableHead}
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
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: "1rem",
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
  miniContent: {
    opacity: "0.85",
    fontSize: "80%",
    margin: 0,
  },
  tableHead: {
    fontWeight: "bold",
  },
}));
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

export default ({
  gaSources,
  isSelected,
  orderBy,
  order,
  handleRequestSort,
  selected,
  dense,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
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
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              // rowCount={gaSources.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(gaSources, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.sourceMedium);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
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
                        <p className={classes.miniContent}>
                          ({average(row.users, gaSources, "users").toFixed(2)}{" "}
                          %)
                        </p>
                      </TableCell>
                      <TableCell align="left">
                        {row.newUsers}{" "}
                        <p className={classes.miniContent}>
                          (
                          {average(row.newUsers, gaSources, "newUsers").toFixed(
                            2
                          )}{" "}
                          %)
                        </p>
                      </TableCell>
                      <TableCell align="left">
                        {row.sessions}{" "}
                        <p className={classes.miniContent}>
                          (
                          {average(row.sessions, gaSources, "sessions").toFixed(
                            2
                          )}{" "}
                          %)
                        </p>
                      </TableCell>
                      <TableCell align="left">
                        {parseFloat(row.bounceRate).toFixed(2)}{" "}
                        <p className={classes.miniContent}>
                          (
                          {average(
                            row.bounceRate,
                            gaSources,
                            "bounceRate"
                          ).toFixed(2)}{" "}
                          %)
                        </p>
                      </TableCell>
                      <TableCell align="left">
                        {parseFloat(row.pageviewsPerSession).toFixed(2)}{" "}
                        <p className={classes.miniContent}>
                          (
                          {average(
                            row.pageviewsPerSession,
                            gaSources,
                            "pageviewsPerSession"
                          ).toFixed(2)}{" "}
                          %)
                        </p>
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
  );
};
