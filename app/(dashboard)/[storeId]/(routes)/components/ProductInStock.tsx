import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetcher } from "@/lib/utils";
import { ShoppingBasket } from "lucide-react";
import { FC } from "react";
import useSWR from "swr";

interface ProductInStockProps {
  storeId: string;
}

const ProductInStock: FC<ProductInStockProps> = async ({ storeId }) => {
  const { data: products, isLoading } = useSWR(
    `/api/${storeId}/product`,
    fetcher,
    {
      onError(e) {
        console.log(`Error in getProductsInstock`, e);
      },
    },
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row gap-3 items-center">
          Products in Stock
          <ShoppingBasket className="ml-auto" />
        </CardHeader>
        <CardContent className="mt-auto text-2xl font-semibold">
          {products?.length || 0}
        </CardContent>
      </Card>
    </>
  );
};

export default ProductInStock;
