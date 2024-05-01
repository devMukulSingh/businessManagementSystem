import ProductClientComp from "@/app/(dashboard)/[storeId]/(routes)/products/components/ProductClientComp";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <ProductClientComp storeId={params.storeId} />
    </>
  );
};

export default ProductsPage;
