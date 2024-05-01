import BillBoardsClientComp from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/BillBoardsClientComp";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <BillBoardsClientComp storeId={params.storeId} />
    </>
  );
};

export default BillboardsPage;
