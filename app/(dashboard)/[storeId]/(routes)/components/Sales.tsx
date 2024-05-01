import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreditCard, DollarSign } from "lucide-react";
import { FC } from "react";

interface SalesProps {
  currMonthOrders: number;
}

const Sales: FC<SalesProps> = ({ currMonthOrders }) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row gap-3 items-center">
          Sales
          <CreditCard className="ml-auto" />
        </CardHeader>
        <CardContent className="mt-auto text-2xl font-semibold">
          +{currMonthOrders}
        </CardContent>
      </Card>
    </>
  );
};

export default Sales;
