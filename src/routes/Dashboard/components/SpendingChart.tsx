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
import { SpendingChartSkeleton } from "@/routes/Dashboard/components/SpendingChartSkeleton";

interface ISpendingChart {
  data: [];
  isLoading: boolean;
}

export const SpendingChart: React.FC<ISpendingChart> = ({
  data,
  isLoading,
}) => {
  return (
    <>
      <h4 style={{ marginBottom: "16px", padding: "13px 15px" }}>
        Spend Frequency
      </h4>
      {isLoading ? (
        <SpendingChartSkeleton />
      ) : (
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
      )}
    </>
  );
};
