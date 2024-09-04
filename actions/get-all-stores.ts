import { prisma } from "@/lib/prisma";
import { cache } from "react";




export const getAllStores = cache(async (userId:string) => {

    const stores = await prisma.store.findMany({
        where: {
            userId,
        },
    });
    return stores;
})