import React, { useState, useEffect } from "react";

import AddWorkspaceForm from "./AddWorkspaceFormContainer";
import { convertDateNow } from "../../../utils/Date";
import { useStoreActions, useStoreState } from "easy-peasy";
import SearchBar from "../../../common/SearchBar";
import WorkspaceManagement from "../components/WorkspaceManagement";
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

export default function ListWorkspace() {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const getListWorkspace = useStoreActions(
    (actions) => actions.workspaces.getWorkspaces
  );
  const workspaces =
    useStoreState((state) => state.workspaces.workspaces) || [];
  const totalWorkspace = useStoreState(
    (state) => state.workspaces.totalWorkspace
  );
  console.log(totalWorkspace);
  useEffect(() => {
    getListWorkspace({ page, searchValue });
  }, [page, searchValue]);

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
      const newSelecteds = workspaces.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <WorkspaceManagement
      workspaces={workspaces}
      handleClose={handleClose}
      open={open}
      handlePage={handlePage}
      totalWorkspace={totalWorkspace}
      handleClick={handleClick}
      isSelected={isSelected}
      orderBy={orderBy}
      order={order}
      handleRequestSort={handleRequestSort}
      handleSelectAllClick={handleSelectAllClick}
      selected={selected}
      setSearchValue={setSearchValue}
      handleOpen={handleOpen}
    />
  );
}
