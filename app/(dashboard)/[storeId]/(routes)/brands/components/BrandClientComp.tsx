import dynamic from "next/dynamic";
import ApiList from "@/components/commons/ApiList";
import { Separator } from "@/components/ui/separator";
import TableSkeleton from "@/components/commons/TableSkeleton";
const BrandTable = dynamic(() => import("./BrandTable"), {
  loading: () => <TableSkeleton />,
});

export interface BrandClientCompProps {
  storeId: string;
}

const BrandClientComp: React.FC<BrandClientCompProps> = ({ storeId }) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <BrandTable storeId={storeId} />
      <Separator />
      <ApiList entityIdName="{brandId}" entityName="brand" />
    </div>
  );
};

export default BrandClientComp;
