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
} from "@material-ui/core";
import axios from "../utils/axios";
import EnhancedTableToolbar, {
  stableSort,
  getComparator,
  EnhancedTableHead,
} from "./HeadTable";
import { TextField, Button } from "@material-ui/core";
import EditCampaignForm from "./EditCampaignForm";
import DetailCampaign from "./DetailCampaign";
import AddCampaignForm from "./AddCampaignForm";
import gql from "graphql-tag";
import { campaignClient } from "../utils/graphClients";
import { convertDateNow } from "../utils/Date";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "workspaceName",
    numeric: false,
    disablePadding: false,
    label: "Workspace",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created Date",
  },
  { id: "expiredAt", numeric: false, disablePadding: false, label: "To" },
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
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [campaigns, setCampaigns] = useState([]);
  const [totalCampains, setTotalCampains] = useState();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [dense] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState({});
  const history = useHistory();
  let searchRef = useRef();

  const query = gql`
    query($page: Int, $query: String) {
      getListCampaign(page: $page, query: $query) {
        listCampaign {
          _id
          name
          email
          googleAnalytics {
            trackingId
            viewId
            isActive
          }
          createdAt
          expiredAt
        }
        totalCampaign
      }
    }
  `;
  useEffect(() => {
    console.log("dm");
    campaignClient
      .query({
        query,
        variables: { page: page, query: searchValue },
        fetchPolicy: "no-cache",
      })
      .then((res) => {
        setCampaigns(res.data.getListCampaign.listCampaign);
        setTotalCampains(res.data.getListCampaign.totalCampaign);
      });
  }, [query, page, searchValue]);

  const [openEditForm, setOpenEditForm] = React.useState(false);
  const handlerClickOpen = () => {
    setOpenDetail(true);
  };

  const handlerClose = () => {
    setOpenDetail(false);
  };

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;
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
              rowCount={campaigns.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(campaigns, getComparator(order, orderBy)).map(
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
                        <Link to={`/campaign-infomation/${row._id}`}>
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">
                        {convertDateNow(row.createdAt)}
                      </TableCell>
                      <TableCell align="left">
                        {convertDateNow(row.expiredAt)}
                      </TableCell>
                      <TableCell>
                        <Popover
                          id={id}
                          open={openPop}
                          anchorEl={anchorEl}
                          onClose={() => {
                            setAnchorEl(null);
                          }}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <Typography className={classes.typography}>
                            <Button
                              onClick={() => {
                                handlerClickOpen();
                              }}
                            >
                              Detail
                            </Button>
                            <Button
                              onClick={() => {
                                setOpenEditForm(true);
                              }}
                            >
                              Edit
                            </Button>
                          </Typography>
                        </Popover>
                        <Button
                          onClick={(e) => {
                            setAnchorEl(e.currentTarget);
                            setDataSelected(row);
                          }}
                        >
                          Action
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* <Switch>
          <Route
            path={"/campaign-infomation"}
            children={<CampaignInfomation />}
          />
        </Switch> */}
      <DetailCampaign
        campaign={dataSelected}
        open={openDetail}
        handleClose={handlerClose}
      />
      <EditCampaignForm
        campaign={dataSelected}
        open={openEditForm}
        handleClose={setOpenEditForm}
      />
      <AddCampaignForm
        open={open}
        handleClose={handleClose}
        campaigns={campaigns}
        setCampaigns={setCampaigns}
      />
      <div className={classes.root + " page-wrapper"}>
        <Pagination
          count={Math.ceil(totalCampains / 10) || 1}
          shape="rounded"
          onChange={(e, newPage) => {
            handlePage(newPage);
          }}
        />
      </div>
    </div>
  );
}
