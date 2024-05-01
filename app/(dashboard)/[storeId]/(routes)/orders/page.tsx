import OrdersClientComp from "@/app/(dashboard)/[storeId]/(routes)/orders/components/OrdersClientComp";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <OrdersClientComp storeId={params.storeId} />
    </>
  );
};

export default OrdersPage;
