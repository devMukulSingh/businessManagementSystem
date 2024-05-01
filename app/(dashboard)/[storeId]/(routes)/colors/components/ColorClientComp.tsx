import ApiList from "@/components/commons/ApiList";
import { Separator } from "@/components/ui/separator";
import ColorTable from "./ColorTable";

export interface ColorClientProps {
  storeId: string;
}

const ColorsClientComp: React.FC<ColorClientProps> = ({ storeId }) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <ColorTable storeId={storeId} />
      <Separator />
      <ApiList entityName="color" entityIdName="{colorId}" />
    </div>
  );
};

export default ColorsClientComp;
