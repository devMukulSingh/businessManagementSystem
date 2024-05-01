// import { cache } from "react";
// import { BillboardColumn } from "@/components/ui/BillboardColumn";
// import { prisma } from "@/lib/prisma";
// import { format } from "date-fns";

// export const getBillboards = cache(async (storeId: string) => {
//   const billboard = await prisma.billboard.findMany({
//     where: {
//       storeId,
//     },
//   });
//   const formattedBillboards: BillboardColumn[] = billboard.map((item) => ({
//     id: item.id,
//     label: item.label,
//     createdAt: format(item.createdAt, "MMMM do, yyyy"),
//   }));
//   return formattedBillboards;
// });
