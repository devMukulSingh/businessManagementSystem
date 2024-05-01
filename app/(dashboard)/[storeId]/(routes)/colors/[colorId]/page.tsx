import ColorForm from "@/app/(dashboard)/[storeId]/(routes)/colors/[colorId]/components/ColorForm";
import { prisma } from "@/lib/prisma";
import { Color } from "@prisma/client";

const SingleColorPage = async ({ params }: { params: { colorId: string } }) => {
  const { colorId } = params;

  const colors: Color | null = await prisma.color.findUnique({
    where: {
      id: colorId,
    },
  });

  return (
    <main>
      <ColorForm initialValues={colors} />
    </main>
  );
};

export default SingleColorPage;
