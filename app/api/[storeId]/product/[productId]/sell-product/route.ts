import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, res: NextResponse,){
    try{
        // console.log(params);
        
        const { quantity ,productId, storeId } = await req.json();

        if(!quantity||quantity===0) return NextResponse.json({
            error:"Quantity is required"
        },{status:400});

        if (!productId)
            return NextResponse.json(
                { error: "product id is required" },
                { status: 400 },
            );
        if (!storeId)
            return NextResponse.json(
                { error: "store id is required" },
                { status: 400 },
            );


        const updatedProduct = await prisma.product.update({
            where:{
                id:productId,
                storeId,
            },
            data:{
                quantity:{
                    decrement:quantity
                }
            }
        });

        return NextResponse.json({msg:"Product updated",updatedProduct},{status:200})
    }
    catch(e){
        console.log("Error in sell - product",e);
        return NextResponse.json(e,{status:500});
    }
}