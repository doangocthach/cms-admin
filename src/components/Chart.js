import React from "react";
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
const converMonth = (stringDate) => {
  let string;
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
const top = [
  {
    date: "20200727",
    numberOfUser: 2,
  },
  {
    date: "20200728",
    numberOfUser: 3,
  },
  {
    date: "20200729",
    numberOfUser: 6,
  },
  {
    date: "20200730",
    numberOfUser: 6,
  },
];

export default () => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <LineChart width={700} height={300} data={top}>
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
          position="left"
          style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
        >
          <Label value="Users" offset={0} position="top" />
        </YAxis>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="numberOfUser" />
      </LineChart>
    </React.Fragment>
  );
};
