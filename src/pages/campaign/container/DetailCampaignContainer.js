import React from "react";

import { useStoreActions, useStoreState } from "easy-peasy";

import DetailCamppaign from "../components/DetailCampaign";

const leaders = [
  {
    name: "Tung",
    score: 202,
  },
  {
    name: "Thach",
    score: 21,
  },
  {
    name: "Tuan Anh",
    score: 22,
  },
  {
    name: "Thang",
    score: 1,
  },
  {
    name: "Huy",
    score: 1,
  },
];

export default ({ campaign, open, handleClose }) => {
  const [enableTrading, setEnableTrading] = React.useState(false);
  const [openTradingDialog, setOpenTradingDialog] = React.useState(false);
  const [openLeaderboard, setOpenLeaderboard] = React.useState(false);
  const [trackingIdSelected, setTrackingIdSelected] = React.useState("");

  const getTrackingId = useStoreActions(
    (action) => action.campaigns.enableTrackingId
  );
  const trackingId = useStoreState((store) => store.campaigns.trackingId);
  const handleOpenTrading = async () => {
    getTrackingId({ campaignId: campaign._id, campaignName: campaign.name });
    setTrackingIdSelected(trackingId);
  };
  const handleViewTrading = (trackingId) => {
    setTrackingIdSelected(trackingId);
  };

  return (
    <DetailCamppaign
      campaign={campaign}
      trackingIdSelected={trackingIdSelected}
      setEnableTrading={setEnableTrading}
      setOpenTradingDialog={setOpenTradingDialog}
      openTradingDialog={openTradingDialog}
      leaders={leaders}
      setOpenLeaderboard={setOpenLeaderboard}
      openLeaderboard={openLeaderboard}
      handleOpenTrading={handleOpenTrading}
      handleViewTrading={handleViewTrading}
      open={open}
      handleClose={handleClose}
    />
  );
};
