import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) redirect("/");

  const store = await prisma.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
