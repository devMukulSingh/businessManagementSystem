import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { DollarSign } from "lucide-react";
import { FC } from "react";

interface TotalRevenueProps {
}

const TotalRevenue: FC<TotalRevenueProps> = ({ }) => {
  const { selectedDateRevenue } = useAppSelector( state => state.adminSlice);
  return (
    <>
      <Card className="">
        <CardHeader className="flex flex-row gap-3 items-center">
          <h1>Total Revenue</h1>
          <DollarSign className="ml-auto" />
        </CardHeader>
        <CardContent className="mt-auto text-2xl font-semibold">
          ₹{selectedDateRevenue}
        </CardContent>
      </Card>
    </>
  );
};

export default TotalRevenue;
