import React, { useState, useRef, useEffect } from "react";
import CampaignManagement from "../components/CampaignManagement";
import { useStoreActions, useStoreState } from "easy-peasy";
export default () => {
  // const [totalCampains, setTotalCampains] = useState();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [dense] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [dataSelected, setDataSelected] = React.useState({});
  // const [campaigns, setCampaigns] = useState([]);
  const getListCampaign = useStoreActions(
    (actions) => actions.campaigns.getCampaigns
  );
  const campaigns = useStoreState((state) => state.campaigns.campaigns) || [];
  const totalCampains = useStoreState((state) => state.campaigns.totalCampaign);
  // setCampaigns(useStoreState((state) => state.campaigns.campaigns) || []);
  useEffect(() => {
    getListCampaign({ page: 1, searchValue });
  }, [searchValue, page]);

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
      const newSelecteds = campaigns.map((n) => n._id);
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
    <CampaignManagement
      campaigns={campaigns}
      setSearchValue={setSearchValue}
      handleOpen={handleOpen}
      selected={selected}
      dense={dense}
      order={order}
      orderBy={orderBy}
      handleSelectAllClick={handleSelectAllClick}
      handleRequestSort={handleRequestSort}
      isSelected={isSelected}
      handleClick={handleClick}
      id={id}
      openPop={openPop}
      anchorEl={anchorEl}
      setAnchorEl={setAnchorEl}
      handlerClickOpen={handlerClickOpen}
      setOpenEditForm={setOpenEditForm}
      setDataSelected={setDataSelected}
      dataSelected={dataSelected}
      openDetail={openDetail}
      handlerClose={handlerClose}
      openEditForm={openEditForm}
      open={open}
      setOpen={setOpen}
      totalCampains={totalCampains}
      handlePage={handlePage}
    />
  );
};
