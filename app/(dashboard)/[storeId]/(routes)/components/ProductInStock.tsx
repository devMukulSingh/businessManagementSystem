import { getAllProducts } from "@/actions/get-all-products";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShoppingBasket } from "lucide-react";
import { FC } from "react";

interface ProductInStockProps {
  storeId: string;
}

const ProductInStock: FC<ProductInStockProps> = async ({ storeId }) => {
  const productsStock = await getAllProducts(storeId);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row gap-3 items-center">
          Product in Stock
          <ShoppingBasket className="ml-auto" />
        </CardHeader>
        <CardContent className="mt-auto text-2xl font-semibold">
          {productsStock}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductInStock;
