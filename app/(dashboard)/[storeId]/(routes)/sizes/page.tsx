import SizeClientComp from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/SizeClientComp";
import { SizeColumn } from "@/components/ui/SizeColumn";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const size = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const formattedSizes: SizeColumn[] = size.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <SizeClientComp size={formattedSizes} />
    </>
  );
};

export default SizePage;
