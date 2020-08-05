import React, { useEffect, useState } from "react";

import { useStoreActions, useStoreState } from "easy-peasy";
import Chart from "../components/Chart";

export default ({ campaignId, dateSelected }) => {
  // const [gaTrafficByDay, setGaTrafficByDay] = useState([]);
  const getGaTrafficByDay = useStoreActions(
    (action) => action.campaigns.getGaTrafficByDay
  );
  const gaTrafficByDay = useStoreState(
    (state) => state.campaigns.gaTrafficByDay
  );
  useEffect(() => {
    getGaTrafficByDay({
      campaignId: campaignId,
      starDate: `${dateSelected.createdAt}`,
      endDate: `${dateSelected.expiredAt}`,
    });
  }, [dateSelected, campaignId]);

  return <Chart gaTrafficByDay={gaTrafficByDay} />;
};
