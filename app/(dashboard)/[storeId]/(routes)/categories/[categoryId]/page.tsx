import CategoryForm from "@/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/components/CategoryForm";
import { prisma } from "@/lib/prisma";

const SingleBillBoardPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const { categoryId, storeId } = params;

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  const billboards = await prisma.billboard.findMany({
    where: {
      storeId,
    },
  });

  return (
    <main>
      <CategoryForm initialValues={category} billboards={billboards} />
    </main>
  );
};

export default SingleBillBoardPage;
