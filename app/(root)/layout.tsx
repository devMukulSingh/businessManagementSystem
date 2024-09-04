import { getStore } from "@/actions/get-store";
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

  const store = await getStore();
  console.log(store);

  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
