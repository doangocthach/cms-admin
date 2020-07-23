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
} from "@material-ui/core";
import axios from "../utils/axios";
import EnhancedTableToolbar, {
  stableSort,
  getComparator,
  EnhancedTableHead,
} from "./HeadTable";
import { TextField, Button } from "@material-ui/core";
function createData(name, workspace, date) {
  return { name, workspace, date };
}

const rows = [
  createData("Xuan Mai", "Tekmate", new Date(2020, 7, 23)),
  createData("Son Tung", "Dong Bat", new Date(2020, 7, 24)),
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "workspace",
    numeric: false,
    disablePadding: false,
    label: "Workspace",
  },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
];
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
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [totalCampains, setTotalCampains] = useState();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handlePage = (page) => {
    setApi(`/api/workspace/list/${page}?search=${searchRef.value}`);
  };
  const handleSearch = () => {
    setApi(`/api/workspace/list/${page}?search=${searchRef.value}`);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [api, setApi] = useState(`/api/workspace/list/1`);
  const [campaigns, setCampaigns] = useState([]);
  let searchRef = useRef();
  useEffect(() => {
    axios.get(api).then((res) => {
      setCampaigns(res.data.listWorkspace);
      setTotalCampains(res.data.totalWorkspace);
    });
    console.log(campaigns);
  }, [api, searchRef]);

  return (
    <div className={classes.root}>
      <div className="search-input">
        <TextField
          className="search-input__input"
          label="Search"
          inputRef={(value) => (searchRef = value)}
        ></TextField>
        <Button
          className="search__button"
          onClick={() => {
            handleSearch();
          }}
        >
          <i className="fas fa-search "></i>
        </Button>
      </div>
      <Button onClick={handleOpen}>+Add Campaign</Button>
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
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => handleClick(event, row.name)}
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
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.workspace}</TableCell>
                      <TableCell align="left">
                        {row.date.toString("dd/mm/yyyy")}
                      </TableCell>
                      <TableCell>
                        <Button>Detail</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div className={classes.root + " page-wrapper"}>
        <Pagination
          count={Math.ceil(totalCampains / 3) || 1}
          shape="rounded"
          onChange={(e, page) => {
            handlePage(page);
          }}
        />
      </div>
    </div>
  );
}
