import TotalRevenue from "@/app/(dashboard)/[storeId]/(routes)/components/TotalRevenue";
import Sales from "@/app/(dashboard)/[storeId]/(routes)/components/Sales";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { FC } from "react";
import ProductInStock from "./ProductInStock";

interface DashboardDataProps {
  storeId: string;
}

const DashboardData: FC<DashboardDataProps> = async ({ storeId }) => {
  const { totalRevenue, currMonthOrders } = await getTotalRevenue(storeId);
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-3">
        <TotalRevenue totalRevenue={totalRevenue} />
        <Sales currMonthOrders={currMonthOrders} />
        <ProductInStock storeId={storeId} />
      </section>
    </>
  );
};

export default DashboardData;
