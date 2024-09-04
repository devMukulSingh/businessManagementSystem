import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { getOrders } from "./get-orders";

export interface IgraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = cache(async (storeId: string) => {
  try {
    console.log("graph");

    const orders = await getOrders(storeId)

    const totalOrders = orders.map((item) => ({
      ...item.product,
      orderPrice: item.orderPrice,
    }));

    const graphData: IgraphData[] = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];

    let i = 0;
    if (totalOrders.length > 0) {
      let totalMonthlyRevenue = 0;
      for (let obj of graphData) {
        //getting totalRevenue of a particular month
        totalMonthlyRevenue =
          totalOrders
            .filter((item) => item.createdAt.getMonth() === i)
            .reduce((acc, next) => {
              if (next.orderPrice) return acc + next.orderPrice;
              else return 0;
            }, 0) || 0;
        //inserting total revenue of particular month in the graphData array
        obj.total = totalMonthlyRevenue;
        i++;
      }
    }
    return graphData;
  } catch (e) {
    console.log(`Error in getGraphRevenue ${e}`);
    return [];
  }
});
