import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreditCard, DollarSign } from "lucide-react";
import { FC } from "react";

interface SalesProps {
  selectedMonthOrders: number;
}

const Sales: FC<SalesProps> = ({ selectedMonthOrders = 0 }) => {
  return (
    <>
      <Card className=" ">
        <CardHeader className="flex flex-row gap-2 items-center">
          Sales
          <CreditCard className="ml-auto" />
        </CardHeader>
        <CardContent className="mt-auto text-2xl font-semibold">
          +{selectedMonthOrders}
        </CardContent>
      </Card>
    </>
  );
};

export default Sales;
