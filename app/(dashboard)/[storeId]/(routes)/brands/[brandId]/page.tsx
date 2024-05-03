import { prisma } from "@/lib/prisma";
import BrandForm from "./components/BrandForm";

const SingleBrandPage = async ({ params }: { params: { brandId: string } }) => {
  const { brandId } = params;

  const brands = await prisma.brand.findUnique({
    where: {
      id: brandId,
    },
  });

  return (
    <>
      <BrandForm initialValues={brands} />
    </>
  );
};

export default SingleBrandPage;
