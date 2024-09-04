import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getStores = cache(async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const store = await prisma.store.findFirst({
    where: {
      userId,
    },
  });
  return store;
});
