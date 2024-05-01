import { prisma } from "@/lib/prisma";

export const getTotalRevenue = async (storeId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        isPaid: true,
        storeId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    //getting current Month
    const currMonth = new Date().getMonth();

    //filtering current Month orders
    const currMonthOrders = orders.filter(
      (item) => item.createdAt.getMonth() === currMonth,
    );

    //calculating total revenue
    const totalRevenue = orders
      .map((item) => item.orderItems.map((item) => item.product.price))
      .flat()
      .reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    return { totalRevenue, currMonthOrders: currMonthOrders.length };
  } catch (e) {
    console.log(`Error in getTotalRevenue ${e}`);
    return { totalRevenue: "", currMonthOrders: 0 };
  }
};
