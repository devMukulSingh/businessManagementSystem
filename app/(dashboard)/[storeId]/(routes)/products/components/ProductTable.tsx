import React, { FC } from "react";
import Header from "./Header";
import { DataTable } from "@/components/commons/DataTable";
import { format } from "date-fns";
import { ProductClientCompProps } from "./ProductClientComp";
import { columns } from "@/components/ui/Product/ProductColumn";
import { getProducts } from "@/actions/get-products";

const ProductTable: FC<ProductClientCompProps> = async ({ storeId }) => {
  const products = await getProducts(storeId);

  const formattedProducts = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    color: item.color,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    brand: item.brand.name,
    quantity: item.quantityAvailable,
  }));
  return (
    <>
      <Header products={products} />
      <DataTable columns={columns} data={formattedProducts} />
    </>
  );
};

export default ProductTable;
