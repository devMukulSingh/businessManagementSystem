import React, { FC } from "react";
import { OrdersClientCompProps } from "./OrdersClientComp";
import { DataTable } from "@/components/commons/DataTable";
import { columns } from "@/components/ui/Order/OrdersColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { getOrders } from "@/actions/get-orders";

const OrderTable: FC<OrdersClientCompProps> = async ({ storeId }) => {
  const orders = await getOrders(storeId)

  const formattedOrders = orders.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    orderPrice: item.orderPrice,
    createdAt: format(item.createdAt, "dd/MMM/yyyy kk:mm:ss"),
    dueAmount: item.dueAmount,
    isPaymentDue: item.dueAmount === 0 ? "No" : "Yes",
    customerName: item.customerName,
    quantity:item.quantity
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
