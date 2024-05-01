import dynamic from "next/dynamic";
import ApiList from "@/components/commons/ApiList";
import { Separator } from "@/components/ui/separator";
import TableSkeleton from "@/components/commons/TableSkeleton";
const BillboardsTable = dynamic(() => import("./BillboardsTable"), {
  loading: () => <TableSkeleton />,
});

interface BillBoardClientCompProps {
  storeId: string;
}

const BillBoardsClientComp: React.FC<BillBoardClientCompProps> = ({
  storeId,
}) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <BillboardsTable storeId={storeId} />
      <Separator />
      <ApiList entityName="billboard" entityIdName="{billboardId}" />
    </div>
  );
};

export default BillBoardsClientComp;
