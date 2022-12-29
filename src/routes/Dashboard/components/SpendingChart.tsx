import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import { SpendingChartFiltr } from "@/routes/Dashboard/components/SpendingChartFiltr";

export const SpendingChart = ({ data, isLoading }) => {
  // const formatter = (value, name, props) => {
  //     let formattedName = labelByCategory[name]
  //     let formattedValue = Math.round(value * 100) / 100 return [formattedValue, formattedName, props]
  // }
  return isLoading ? (
    <p>Loading</p>
  ) : (
    <>
      <h4 style={{ marginBottom: "16px", paddingBlock: "13px" }}>
        Spend Frequency
      </h4>
      <ResponsiveContainer width="100%" height={190}>
        <AreaChart
          width={345}
          height={190}
          data={data}
          margin={{
            bottom: 9,
          }}
        >
          <Tooltip
            label="name"
            labelFormatter={(_, [label]) =>
              label && label.payload ? label.payload.name : ""
            }
          />
          {/*<XAxis dataKey="name" />*/}
          <Area
            type="monotone"
            dataKey="uv"
            name={"spent"}
            stroke="#7F3DFF"
            strokeWidth={5}
            fill="rgba(139, 80, 255, 0.24)"
            textLength={5}
            label={"label"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};
