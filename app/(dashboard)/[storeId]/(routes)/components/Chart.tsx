"use client";
import { IgraphData } from "@/actions/get-graph-revenue";
import React, { FC } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ChartProps {
  graphData: IgraphData[];
}
const Chart: FC<ChartProps> = ({ graphData }) => {
  return (
    <>
      <div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={graphData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
