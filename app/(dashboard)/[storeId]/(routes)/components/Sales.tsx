import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { CreditCard, DollarSign } from "lucide-react";
import { useParams } from "next/navigation";
import { FC } from "react";

interface SalesProps {}

const Sales: FC<SalesProps> = ({}) => {
  const { storeId } = useParams();
  const { dasboardData:dashboardDataArr } = useAppSelector((state) => state.adminSlice);
  const dasboardData = dashboardDataArr.find(
    (item) => item.storeId === storeId
  );

  return (
    <>
      <Card className=" ">
        <CardHeader className="flex flex-row gap-2 items-center">
          Sales
          <CreditCard className="ml-auto" />
        </CardHeader>
        <CardContent className="mt-auto text-2xl font-semibold">
          +{dasboardData?.selectedDateOrders || 0}
        </CardContent>
      </Card>
    </>
  );
};

export default Sales;
