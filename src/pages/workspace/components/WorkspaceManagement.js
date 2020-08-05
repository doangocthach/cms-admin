import React from "react";
import "./ListWorkspace.scss";
import {
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
import AddWorkspaceFormContainer from "../container/AddWorkspaceFormContainer";
import { convertDateNow } from "../../../utils/Date";
import EnhancedTableToolbar, {
  stableSort,
  getComparator,
  EnhancedTableHead,
} from "../../../common/HeadTable";
import SearchBar from "../../../common/SearchBar";
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
    label: "Created Date",
  },
];

export default function ListWorkspace({
  workspaces,
  handleClose,
  open,
  handlePage,
  totalWorkspace,
  handleClick,
  isSelected,
  orderBy,
  order,
  handleRequestSort,
  handleSelectAllClick,
  selected,
  setSearchValue,
  handleOpen,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="list-workspace">
        {console.log(workspaces)}
        <SearchBar setQuery={setSearchValue} />
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
                  // console.log(row);
                  const isItemSelected = isSelected(row.id);
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
                        onClick={(event) => handleClick(event, row.id)}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
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
                        {convertDateNow(row.createdAt)}
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
          count={Math.ceil(totalWorkspace / 3) || 1}
          shape="rounded"
          onChange={(e, newPage) => {
            handlePage(newPage);
          }}
        />
      </div>
      <AddWorkspaceFormContainer
        open={open}
        handleClose={handleClose}
        workspaces={workspaces}
        // setWorkspace={setWorkspace}
      />
    </React.Fragment>
  );
}
