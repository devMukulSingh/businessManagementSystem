"use client";
import { FC, lazy, Suspense, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import { fetcher, months } from "@/lib/utils";
import { Order, Product } from "@prisma/client";
import CardSkeleton from "./CardSkeleton";
import dynamic from "next/dynamic";

const TotalRevenue = lazy(
  () => import("@/app/(dashboard)/[storeId]/(routes)/components/TotalRevenue")
);
const Sales = lazy(
  () => import("@/app/(dashboard)/[storeId]/(routes)/components/Sales")
);
const ProductInStock = lazy(() => import("./ProductInStock"));

interface IExtendedOrder extends Order  {
  product: Product;
}

interface DashboardDataProps {
  storeId: string;
}

const DashboardData: FC<DashboardDataProps> = ({ storeId }) => {
  const currentMonth = new Date().getMonth().toString();

  const { data: orders, isLoading } = useSWR(`/api/${storeId}/order`, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    onError(err) {
      console.log(`Error in getOrders`, err);
    },
    onSuccess(data: IExtendedOrder[]) {
      const filteredOrderItems =
        data
          ?.filter(
            (order) =>  
              new Date(order.createdAt).getMonth() === Number(currentMonth)
          )
          .flat() || [];
      setSelectedMonthOrders(filteredOrderItems?.length);
      console.log(filteredOrderItems, "filteredOrderItems");

      if (filteredOrderItems.length > 0) {
        const filteredRevenue =
          filteredOrderItems
            .map( (order) => order.product.price )
            
            .reduce((acc: number, curr: number) => acc + curr, 0) || 0;
        setSelectedMonthRevenue(filteredRevenue);
        console.log(filteredRevenue, "filteredRevenue");
      }
    },
  });

  const [selectedMonthOrders, setSelectedMonthOrders] = useState<number>(0);
  const [selectedMonthRevenue, setSelectedMonthRevenue] = useState<number>(0);

  const handleMonthChange = (selectedMonth: string) => {
    console.log(selectedMonth);
    
    const filteredOrderItems = orders
      ?.filter(
        (order: Order) =>
          new Date(order.createdAt).getMonth() === Number(selectedMonth)
      )
      // .flat();
    setSelectedMonthOrders(filteredOrderItems?.length);
    console.log(filteredOrderItems, "filteredOrderItems");

    if (filteredOrderItems.length > 0) {
      const filteredRevenue =
        filteredOrderItems
          .map((order: IExtendedOrder) => order.product.price)
          .flat()
          .reduce((acc: number, curr: number) => acc + curr, 0) || 0;
      setSelectedMonthRevenue(filteredRevenue);
      console.log(filteredRevenue, "filteredRevenue");
    } else setSelectedMonthRevenue(0);
  };

  return (
    <div className="flex flex-col gap-5">
      <Select
        defaultValue={currentMonth.toString()}
        onValueChange={(selectedMonth) => handleMonthChange(selectedMonth)}
      >
        <SelectTrigger disabled={isLoading} className="w-full sm:w-1/3">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month: string, index: number) => (
            <SelectItem key={index} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <section className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-3">
        <Suspense fallback={<CardSkeleton />}>
          <TotalRevenue selectedMonthRevenue={selectedMonthRevenue} />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Sales selectedMonthOrders={selectedMonthOrders} />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <ProductInStock storeId={storeId} />
        </Suspense>
      </section>
    </div>
  );
};

export default DashboardData;
