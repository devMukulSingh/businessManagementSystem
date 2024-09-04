import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/store/hooks";
import { CreditCard, DollarSign } from "lucide-react";
import { FC } from "react";

interface SalesProps {}

const Sales: FC<SalesProps> = ({}) => {
  const { selectedDateOrders } = useAppSelector((state) => state.adminSlice);

  return (
    <>
      <Card className=" ">
        <CardHeader className="flex flex-row gap-2 items-center">
          Sales
          <CreditCard className="ml-auto" />
        </CardHeader>
        <CardContent className="mt-auto text-2xl font-semibold">
          +{selectedDateOrders}
        </CardContent>
      </Card>
    </>
  );
};

export default Sales;
