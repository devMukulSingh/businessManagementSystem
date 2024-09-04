"use client";
import { FC, lazy, Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import { cn, fetcher, months } from "@/lib/utils";
import { Order, Product } from "@prisma/client";
import CardSkeleton from "./CardSkeleton";
import dynamic from "next/dynamic";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedDateOrders, setSelectedDateRevenue } from "@/store/slice";
import { OrdersColumn } from "@/components/ui/Order/OrdersColumn";
const TotalRevenue = lazy(
  () => import("@/app/(dashboard)/[storeId]/(routes)/components/TotalRevenue"),
);
const Sales = lazy(
  () => import("@/app/(dashboard)/[storeId]/(routes)/components/Sales"),
);
const ProductInStock = lazy(() => import("./ProductInStock"));

interface IExtendedOrder extends Order {
  product: Product;
}

interface DashboardDataProps {
  storeId: string;
}

const DashboardData: FC<DashboardDataProps> = ({ storeId }) => {
  const dispatch = useAppDispatch();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >({
    from: new Date(currentYear, currentMonth, 1),
    to: addDays(new Date(currentYear, currentMonth, 30), 0),
  });

  // const { data } = useS

  const { data: orders, isLoading } = useSWR<IExtendedOrder[]>(
    `/api/${storeId}/order`,
    fetcher,
    {
      revalidateOnFocus: false,
      onError(err) {
        console.log(`Error in getOrders`, err);
      },
    },
  );

  const handleMonthChange = (date: DateRange | undefined) => {
    setSelectedDateRange(date);
    let selectedDateOrders: IExtendedOrder[] = [];
    const from = date?.from?.setHours(0, 0, 0, 0) || Date.now();
    const to = date?.to?.setHours(0, 0, 0, 0) || Date.now();
    if (date && date?.from && date?.to) {
      selectedDateOrders =
        orders?.filter((order) => {
          const createdAt = new Date(order.createdAt).setHours(0, 0, 0, 0);
          if (createdAt >= from && createdAt <= to) {
            return order;
          }
        }) || [];
    } else if (!date?.from || !date?.to) {
      selectedDateOrders =
        orders?.filter((order) => {
          const createdAt = new Date(order.createdAt).setHours(0, 0, 0, 0);
          if (createdAt === from || createdAt === to) {
            return order;
          }
        }) || [];
    }
    const selectedDateSales = selectedDateOrders.reduce((acc, next) => {
      if (next.quantity) return acc + next.quantity;
      return 0;
    }, 0);

    dispatch(setSelectedDateOrders(selectedDateSales));

    if (selectedDateOrders.length > 0) {
      const filteredRevenue =
        selectedDateOrders.reduce((acc, curr) => {
          if (curr.orderPrice) return acc + curr.orderPrice;
          else return 0;
        }, 0) || 0;

      dispatch(setSelectedDateRevenue(filteredRevenue));
    } else dispatch(setSelectedDateRevenue(0));
  };

  useEffect(() => {
    //setting currentmonth transactions in state
    console.log(orders, "orders");
    
    const currMonthOrders =
      orders?.filter(
        (order) =>
          new Date(order.createdAt).getMonth() === Number(currentMonth),
      ) || [];
    console.log(currMonthOrders, "currMonthOrders");

    const selectedDateSales = currMonthOrders.reduce((acc, next) => {
      if (next.quantity) return acc + next?.quantity;
      else return acc + 0
    }, 0);
    // console.log(selectedDateSales, "selectedDateSales");

    dispatch(setSelectedDateOrders(selectedDateSales));

    //setting selected month revenue in state
    if (currMonthOrders.length > 0) {
      const filteredRevenue = currMonthOrders.reduce((acc, curr) => {
        if (curr.orderPrice) return acc + curr.orderPrice;
        else return acc + 0;
      }, 0);
      // console.log(filteredRevenue,"filterdRevenue");
      
      dispatch(setSelectedDateRevenue(filteredRevenue));
    }
  }, [orders]);
  return (
    <div className="flex flex-col gap-5">
      <Popover>
        <PopoverTrigger asChild className="">
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !selectedDateRange && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDateRange?.from ? (
              selectedDateRange.to ? (
                <>
                  {format(selectedDateRange.from, "LLL dd, y")} -{" "}
                  {format(selectedDateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(selectedDateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={selectedDateRange?.from}
            selected={selectedDateRange}
            onSelect={(date) => handleMonthChange(date)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <section className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-3">
        <Suspense fallback={<CardSkeleton />}>
          <TotalRevenue />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Sales />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <ProductInStock storeId={storeId} />
        </Suspense>
      </section>
    </div>
  );
};

export default DashboardData;
