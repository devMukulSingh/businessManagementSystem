import SizeForm from "@/app/(dashboard)/[storeId]/(routes)/sizes/[sizeId]/components/SizeForm";
import { prisma } from "@/lib/prisma";

const SingleSizePage = async ({ params }: { params: { sizeId: string } }) => {
  const { sizeId } = params;

  const sizes = await prisma.size.findUnique({
    where: {
      id: sizeId,
    },
  });

  return (
    <main>
      <SizeForm initialValues={sizes} />
    </main>
  );
};

export default SingleSizePage;
