import React, { useState } from "react";
import "./ListWorkspace.scss";
import {
  TextField,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  Table,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { red, blue } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function ListWorkspace({ workspaces }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [searchValue, setSearchVavlue] = useState("");
  return (
    <React.Fragment>
      <div className="list-workspace">
        <div className="search-input">
          <TextField
            className="search-input__input"
            label="Search"
            onChange={(e) => {
              setSearchVavlue(e.target.value);
            }}
          ></TextField>
          <Button className="search__button">
            <i class="fas fa-search "></i>
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Workspace Name</TableCell>
                <TableCell align="left">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workspaces.map(
                (workspace) =>
                  (workspace.email
                    .toUpperCase()
                    .includes(searchValue.toUpperCase()) ||
                    workspace.name
                      .toUpperCase()
                      .includes(searchValue.toUpperCase())) && (
                    <TableRow key={workspace._id}>
                      <TableCell align="left">
                        <a href="/" className="card-content-wrapper">
                          {workspace.name}
                        </a>
                      </TableCell>
                      <TableCell align="left">{workspace.email}</TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.root + " page-wrapper"}>
        <Pagination
          count={workspaces.length || 1}
          shape="rounded"
          onChange={(e, page) => {
            setPage(page);
            console.log(page);
          }}
        />
      </div>
    </React.Fragment>
  );
}
