import React, { useState, useEffect, useRef } from "react";
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
import axios from "../utils/axios";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function ListWorkspace() {
  const classes = useStyles();
  const [page] = useState(1);
  const [workspaces, setWorkspace] = useState([]);
  const [totalWorkspace, setTotalWorkspace] = useState();
  const [api, setApi] = useState(`/api/workspace/list/1`);

  let searchRef = useRef();
  useEffect(() => {
    axios.get(api).then((res) => {
      setWorkspace(res.data.listWorkspace);
      setTotalWorkspace(res.data.totalWorkspace);
    });
  }, [api, searchRef]);

  const handleSearch = () => {
    setApi(`/api/workspace/list/${page}?search=${searchRef.value}`);
  };

  const handlePage = (page) => {
    setApi(`/api/workspace/list/${page}?search=${searchRef.value}`);
  };
  return (
    <React.Fragment>
      <div className="list-workspace">
        <div className="search-input">
          <TextField
            className="search-input__input"
            label="Search"
            inputRef={(value) => (searchRef = value)}
            // onChange={(e) => {
            //   setSearchVavlue(e.target.value);
            // }}
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

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Workspace Name</TableCell>
                <TableCell align="left">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workspaces.map((workspace) => (
                <TableRow key={workspace._id}>
                  <TableCell align="left">
                    <a href="/" className="card-content-wrapper">
                      {workspace.name}
                    </a>
                  </TableCell>
                  <TableCell align="left">{workspace.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.root + " page-wrapper"}>
        <Pagination
          count={Math.ceil(totalWorkspace / 3) || 1}
          shape="rounded"
          onChange={(e, page) => {
            handlePage(page);
          }}
        />
      </div>
    </React.Fragment>
  );
}
