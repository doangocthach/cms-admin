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
import EnhancedTableToolbar, {
  stableSort,
  getComparator,
  EnhancedTableHead,
} from "../../../common/HeadTable";
import { Button } from "@material-ui/core";
import EditCampaignForm from "./EditCampaignForm";
import DetailCampaignContainer from "../container/DetailCampaignContainer";
import AddCampaignFormContainer from "../container/AddCampaignFormContainer";
import { convertDateNow } from "../../../utils/Date";
import { Link } from "react-router-dom";
import SearchBar from "../../../common/SearchBar";

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

export default function ({
  campaigns,
  setSearchValue,
  handleOpen,
  selected,
  dense,
  order,
  orderBy,
  handleSelectAllClick,
  handleRequestSort,
  isSelected,
  handleClick,
  id,
  openPop,
  anchorEl,
  setAnchorEl,
  handlerClickOpen,
  setOpenEditForm,
  setDataSelected,
  dataSelected,
  openDetail,
  handlerClose,
  openEditForm,
  open,
  setOpen,
  totalCampains,
  handlePage,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <SearchBar setQuery={setSearchValue} />

      <Button onClick={handleOpen}>+Add Campaign</Button>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>
        <Paper className={classes.paper}>
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
                  // console.log(row);
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={(event) => handleClick(event, row._id)}
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
        </Paper>
      </TableContainer>
      <DetailCampaignContainer
        campaign={dataSelected}
        open={openDetail}
        handleClose={handlerClose}
      />
      <EditCampaignForm
        campaign={dataSelected}
        open={openEditForm}
        handleClose={setOpenEditForm}
      />
      <AddCampaignFormContainer
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        campaigns={campaigns}
        // setCampaigns={setCampaigns}
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
