import React, { useState, useEffect, useRef } from "react";
import "./ListWorkspace.scss";
import {
  TextField,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Table,
  Button,
  Checkbox,
  makeStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import AddWorkspaceForm from "./AddWorkspaceForm";
import gql from "graphql-tag";
import { workspaceClient } from "../utils/graphClients";
import { converDateNow } from "../utils/Date";
import EnhancedTableToolbar, {
  stableSort,
  getComparator,
  EnhancedTableHead,
} from "./HeadTable";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
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

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Workspace Name",
    type: "string",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Owner Email",
    type: "string",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Created Date"
  },
];

export default function ListWorkspace() {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [workspaces, setWorkspace] = useState([]);
  const [totalWorkspace, setTotalWorkspace] = useState();

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  let searchRef = useRef();

  const query = gql`
    query($page: Int, $query: String) {
      getListWorkspace(page: $page, query: $query) {
        listWorkspace {
          id
          name
          email
          createdAt
        }
        totalWorkspace
      }
    }
  `;
  useEffect(() => {
    workspaceClient
      .query({
        query,
        variables: { page: page, query: searchValue },
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        console.log(res.data);
        setWorkspace(res.data.getListWorkspace.listWorkspace);
        setTotalWorkspace(res.data.getListWorkspace.totalWorkspace);
      });
  }, [query, page, searchValue]);

  const handleSearch = () => {
    setSearchValue(searchRef.value);
  };

  const handlePage = (newPage) => {
    setPage(newPage);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = workspaces.map((n) => n.name);
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

  return (
    <React.Fragment>
      <div className="list-workspace">
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
        <Button onClick={handleOpen}>+Add Workspace</Button>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table" className={classes.table}>
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={workspaces.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(workspaces, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.name);
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
                      <TableCell align="left" padding="none">
                        {row.email}
                      </TableCell>
                      <TableCell align="left" padding="none">
                        {converDateNow(row.createdAt)}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.root + " page-wrapper"}>
        <Pagination
          count={Math.ceil(totalWorkspace / 10) || 1}
          shape="rounded"
          onChange={(e, newPage) => {
            handlePage(newPage);
          }}
        />
      </div>
      <AddWorkspaceForm
        open={open}
        handleClose={handleClose}
        workspaces={workspaces}
        setWorkspace={setWorkspace}
      />
    </React.Fragment>
  );
}
