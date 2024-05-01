import BrandClientComp from "@/app/(dashboard)/[storeId]/(routes)/brands/components/BrandClientComp";

const BrandPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <BrandClientComp storeId={params.storeId} />
    </>
  );
};

export default BrandPage;
