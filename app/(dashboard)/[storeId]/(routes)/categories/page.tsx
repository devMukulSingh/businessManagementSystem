import CategoriesClientComp from "@/app/(dashboard)/[storeId]/(routes)/categories/components/CategoriesClientComp";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <CategoriesClientComp storeId={params.storeId} />
    </>
  );
};

export default CategoriesPage;
