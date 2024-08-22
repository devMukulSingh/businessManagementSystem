import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { FC } from "react";

interface TotalRevenueProps {
  selectedMonthRevenue: number;
}

const TotalRevenue: FC<TotalRevenueProps> = ({ selectedMonthRevenue = 0 }) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row gap-3 items-center">
          <h1>Total Revenue</h1>
          <DollarSign className="ml-auto" />
        </CardHeader>
        <CardContent className="mt-auto text-2xl font-semibold">
          ₹{selectedMonthRevenue}
        </CardContent>
      </Card>
    </>
  );
};

export default TotalRevenue;
