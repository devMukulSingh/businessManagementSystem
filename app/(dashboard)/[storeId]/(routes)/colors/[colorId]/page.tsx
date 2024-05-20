import ColorForm from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/ColorForm";
import { prisma } from "@/lib/prisma";
import { Color } from "@prisma/client";

const SingleColorPage = async ({ params }: { params: { colorId: string } }) => {
  const { colorId } = params;

  let colors = null;
  if (colorId !== "new")
    colors = await prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });
  return (
    <>
      <ColorForm initialValues={colors} />
    </>
  );
};

export default SingleColorPage;
