import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { DollarSign } from "lucide-react";
import { useParams } from "next/navigation";
import { FC } from "react";

interface TotalRevenueProps {}

const TotalRevenue: FC<TotalRevenueProps> = ({}) => {
  const { storeId } = useParams();
  const { dasboardData: dasboardDataArr } = useAppSelector(
    (state) => state.adminSlice,
  );
  const dasboardData = dasboardDataArr.find((item) => item.storeId === storeId);

  return (
    <>
      <Card className="">
        <CardHeader className="flex flex-row gap-3 items-center">
          <h1>Total Revenue</h1>
          <DollarSign className="ml-auto" />
        </CardHeader>
        <CardContent className="mt-auto text-2xl font-semibold">
          ₹{dasboardData?.selectedDateRevenue || 0}
        </CardContent>
      </Card>
    </>
  );
};

export default TotalRevenue;
