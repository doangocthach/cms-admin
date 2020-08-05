import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import CampaignInfomation from "../components/CampaignInfomation";

export default (props) => {
  const campaignId = props.match.params.campaignId;

  // const [gaTraffic, setGaTraffic] = useState([]);
  const [dateSelected, setDateSelected] = useState({
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).getTime(),
    expiredAt: new Date().getTime(),
  });

  const getGaTraffic = useStoreActions(
    (actions) => actions.campaigns.getGaTraffic
  );
  const gaTraffic = useStoreState((state) => state.campaigns.gaTraffic) || [];

  useEffect(() => {
    getGaTraffic(campaignId);
  }, [campaignId]);

  return (
    <CampaignInfomation
      campaignId={campaignId}
      gaTraffic={gaTraffic}
      dateSelected={dateSelected}
      setDateSelected={setDateSelected}
    />
  );
};
