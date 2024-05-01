import BillboardForm from "@/app/(dashboard)/[storeId]/(routes)/billboards/[billboardId]/components/BillboardForm";
import { prisma } from "@/lib/prisma";

const SingleBillBoardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const { billboardId } = params;

  const billboard = await prisma.billboard.findUnique({
    where: {
      id: billboardId,
    },
    include: {
      images: true,
    },
  });

  return (
    <>
      <BillboardForm initialValues={billboard} />
    </>
  );
};

export default SingleBillBoardPage;
