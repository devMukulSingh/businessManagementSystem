import React, { FC } from "react";
import { OrdersClientCompProps } from "./OrdersClientComp";
import { DataTable } from "@/components/commons/DataTable";
import { columns } from "@/components/ui/OrdersColumn";
import { prisma } from "@/lib/prisma";
import { OrderItem } from "@prisma/client";
import { format } from "date-fns";

interface IorderItem extends OrderItem {
  product: {
    name: string;
    price: number;
    isFeatured: Boolean;
    isArchived: Boolean;
  };
}

const OrderTable: FC<OrdersClientCompProps> = async ({ storeId }) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const formattedOrders = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem: IorderItem) => orderItem.product.name)
      .join(","),
    totalPrice: item.orderItems.reduce(
      (prevPrice: number, orderItem: IorderItem) => {
        return prevPrice + orderItem.product.price;
      },
      0,
    ),
    createdAt: format(item.updatedAt, "dd/MMM/yyyy HH:mm a"),
  }));

  return (
    <>
      <header className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders({orders.length})</h1>
          <p className="text-sm text-slate-500">Manage orders</p>
        </div>
      </header>
      <DataTable columns={columns} data={formattedOrders} />
    </>
  );
};

export default OrderTable;
