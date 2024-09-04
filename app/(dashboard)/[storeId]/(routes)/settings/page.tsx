import { getStores } from "@/actions/get-stores";
import SettingsForm from "@/app/(dashboard)/[storeId]/(routes)/settings/components/SettingsForm";
import { redirect } from "next/navigation";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const store = await getStores();

  if (!store) redirect("/");

  return (
    <>
      <SettingsForm initialValues={store} />
    </>
  );
};

export default SettingsPage;
