import Navbar from "@/components/commons/Navbar";
import { prisma } from "@/lib/prisma";
import { auth, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { storeId } = params;

  const { userId } = auth();

  if (!userId) redirect("/");

  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      userId: userId,
    },
  });

  if (!store) redirect("/");

  return (
    <div className="w-full min-h-screen">
      <Navbar storeId={storeId} />
      {/* <Sidebar /> */}
      {children}
    </div>
  );
}
