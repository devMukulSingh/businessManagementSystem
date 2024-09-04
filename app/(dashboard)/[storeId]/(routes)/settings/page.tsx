import { getStore } from "@/actions/get-store";
import SettingsForm from "@/app/(dashboard)/[storeId]/(routes)/settings/components/SettingsForm";
import { redirect } from "next/navigation";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await getStore();

  if (!store) redirect("/");

  return (
    <>
      <SettingsForm initialValues={store} />
    </>
  );
};

export default SettingsPage;
