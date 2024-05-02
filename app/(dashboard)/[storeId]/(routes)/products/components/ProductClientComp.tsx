import dynamic from "next/dynamic";
import ApiList from "@/components/commons/ApiList";
import { Separator } from "@/components/ui/separator";
import TableSkeleton from "@/components/commons/TableSkeleton";
const ProductTable = dynamic(() => import("./ProductTable"), {
  loading: () => <TableSkeleton />,
});

export interface ProductClientCompProps {
  storeId: string;
}

const ProductClientComp: React.FC<ProductClientCompProps> = ({ storeId }) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <ProductTable storeId={storeId} />
      <Separator />
      <ApiList entityIdName="{productId}" entityName="product" />
    </div>
  );
};

export default ProductClientComp;
