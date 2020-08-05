import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "@material-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";
const converMonth = (stringDate) => {
  let Date = stringDate.substring(6, 8);
  let Month = stringDate.substring(4, 6);
  if (Month === "01") Month = "Jan";
  else if (Month === "02") Month = "Feb";
  else if (Month === "03") Month = "Mar";
  else if (Month === "04") Month = "Apr";
  else if (Month === "05") Month = "May";
  else if (Month === "06") Month = "Jun";
  else if (Month === "07") Month = "Jul";
  else if (Month === "08") Month = "Aug";
  else if (Month === "09") Month = "Sep";
  else if (Month === "10") Month = "Oct";
  else if (Month === "11") Month = "Nov";
  else if (Month === "12") Month = "Dec";
  return Month + " " + Date;
};

export default ({ gaTrafficByDay }) => {
  // const [gaTrafficByDay, setGaTrafficByDay] = useState([]);
  // const getGaTrafficByDay = useStoreActions(
  //   (action) => action.campaigns.getGaTrafficByDay
  // );
  // const gaTrafficByDay = useStoreState(
  //   (state) => state.campaigns.gaTrafficByDay
  // );
  // useEffect(() => {
  //   // console.log(dateSelected);
  //   getGaTrafficByDay({
  //     campaignId: campaignId,
  //     starDate: `${dateSelected.createdAt}`,
  //     endDate: `${dateSelected.expiredAt}`,
  //   });
  // }, [dateSelected, campaignId]);
  const theme = useTheme();
  return (
    <React.Fragment>
      <ResponsiveContainer width={700} height={300}>
        <LineChart
          margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
          data={gaTrafficByDay}
        >
          <XAxis
            dataKey={(data) => {
              return converMonth(data.date);
            }}
            position="left"
            style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            padding={{ left: 30, right: 30 }}
          >
            <Label value="Time" offset={0} position="right" />
          </XAxis>

          <YAxis
            dataKey={(data) => {
              return data.numberOfUser;
            }}
            angle={270}
            tickMargin={10}
            position="left"
            style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
          >
            <Label value="Users" offset={10} position="top" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="numberOfUser" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};
