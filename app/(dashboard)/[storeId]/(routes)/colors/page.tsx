import ColorClientComp from "@/app/(dashboard)/[storeId]/(routes)/colors/components/ColorClientComp";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <ColorClientComp storeId={params.storeId} />
    </>
  );
};

export default ColorPage;
