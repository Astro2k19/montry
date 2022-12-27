import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import React from "react";
import { SpendingChartFiltr } from "@/routes/Dashboard/components/SpendingChartFiltr";

export const SpendingChart = ({ data, isLoading }) => {
  return isLoading ? (
    <p>Loading</p>
  ) : (
    <>
      <div style={{ marginBottom: "30px" }}>Spend Frequency</div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart width={300} height={100} data={data}>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
