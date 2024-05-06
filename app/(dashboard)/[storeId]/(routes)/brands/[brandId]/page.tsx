import { prisma } from "@/lib/prisma";
import BrandForm from "./components/BrandForm";

const SingleBrandPage = async ({ params }: { params: { brandId: string } }) => {
  const { brandId } = params;
  let brand = null;
  if (brandId !== "new")
    brand = await prisma.brand.findUnique({
      where: {
        id: brandId,
      },
    });

  return (
    <>
      <BrandForm initialValues={brand} />
    </>
  );
};

export default SingleBrandPage;
