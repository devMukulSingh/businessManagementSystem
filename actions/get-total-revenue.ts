import { prisma } from "@/lib/prisma";

export const getTotalRevenue = async (storeId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        storeId,
        dueAmount:0
      },
      include:{
        product:true
      }

    });

    //getting current Month
    const currMonth = new Date().getMonth();

    //filtering current Month orders
    const currMonthOrders = orders.filter(
      (item) => item.updatedAt.getMonth() === currMonth,
    );

    //calculating total revenue
    const totalRevenue = orders.reduce( (prev,curr) => prev+curr.product.price ,0)

    return { totalRevenue, currMonthOrders: currMonthOrders.length };
  } catch (e) {
    console.log(`Error in getTotalRevenue ${e}`);
    return { totalRevenue: "", currMonthOrders: 0 };
  }
};
