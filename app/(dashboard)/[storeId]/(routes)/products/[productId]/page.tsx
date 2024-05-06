import ProductForm from "@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ProductForm";
import { prisma } from "@/lib/prisma";
import { Brand, Color } from "@prisma/client";

const SingleProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const { productId, storeId } = params;

  let formattedProducts = null;
  if(productId!=='new') {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
  });
  formattedProducts = {
    name: product?.name,
    price: product?.price,
    colorId: product?.colorId,
    brandId: product?.brandId,
    quantity: product?.quantityAvailable,
  };
}
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

  return (
    <>
      <ProductForm
        initialValues={formattedProducts}
        colors={colors}
        brands={brands}
      />
    </>
  );
};

export default SingleProductPage;
