import ProductForm from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ProductForm";
import { prisma } from "@/lib/prisma";
import { Brand, Color } from "@prisma/client";

const SingleProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const { productId, storeId } = params;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  const colors: Color[] = await prisma.color.findMany({
    where: {
      storeId,
    },
  });
  const brands: Brand[] = await prisma.brand.findMany({
    where: {
      storeId,
    },
  });

  // const categories: Category[] = await prisma.category.findMany({
  //   where: {
  //     storeId,
  //   },
  // });

  const formattedProducts = {
    name: product?.name,
    price: product?.price,
    colorId: product?.colorId,
    //@ts-ignore
    brandId: product?.brandId,
    // images: product?.images,
    // description: product?.description?.map((point: string) => point).join("\n"),
    // ratings: product?.ratings,
    // categoryId: product?.categoryId,
    // sizeId: product?.sizeId,
    // featured: product?.isFeatured,
    // archived: product?.isArchived,
  };

  return (
    <>
      <ProductForm
        //@ts-ignore
        initialValues={formattedProducts}
        colors={colors}
        brands={brands}
      />
    </>
  );
};

export default SingleProductPage;
