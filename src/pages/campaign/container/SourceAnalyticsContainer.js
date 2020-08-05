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
// import { DeleteIcon } from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";
import { campaignClient } from "../../../utils/graphClients";
import gql from "graphql-tag";
import SourceAnalytics from "../components/SourceAnalytics";
// import { lighten } from "@material-ui/core/styles";
import { useStoreActions, useStoreState } from "easy-peasy";

export default ({ campaignId }) => {
  // const [gaSources, setGaSources] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [dense] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const getSources = useStoreActions(
    (action) => action.campaigns.getSourcesAnalytics
  );
  const gaSources = useStoreState((sate) => sate.campaigns.gaSources) || [];

  useEffect(() => {
    // campaignClient
    //   .query({
    //     query: getSources,
    //     variables: { campaignId: campaignId },
    //   })
    //   .then((res) => {
    //     console.log(res.data.getSources);
    //     setGaSources(res.data.getSources);
    //   });
    getSources(campaignId);
  }, [campaignId, gaSources]);
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <SourceAnalytics
      gaSources={gaSources}
      isSelected={isSelected}
      orderBy={orderBy}
      order={order}
      handleRequestSort={handleRequestSort}
      selected={selected}
      dense={dense}
    />
  );
};
