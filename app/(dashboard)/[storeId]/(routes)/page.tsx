import dynamic from "next/dynamic";
import ChartSkeleton from "@/app/(dashboard)/[storeId]/(routes)/components/ChartSkeleton";
import DashboardDataSkeleton from "@/app/(dashboard)/[storeId]/(routes)/components/DashboardDataSkeleton";
const ChartSection = dynamic(
  () => import("@/app/(dashboard)/[storeId]/(routes)/components/ChartSection"),
  {
    loading: () => <ChartSkeleton />,
  },
);
const DashboardData = dynamic(
  () => import("@/app/(dashboard)/[storeId]/(routes)/components/DashboardData"),
  {
    loading: () => <DashboardDataSkeleton />,
  },
);

const DashboardPage = async ({ params }: { params: { storeId: string } }) => {
  const { storeId } = params;

  return (
    <div className="p-5 lg:p-15 md:p-10 space-y-10">
      <header>
        <h1 className="text-3xl font-bold">Dasboard</h1>
        <h1>Manage Dashboard</h1>
      </header>

      <DashboardData storeId={storeId} />
      <ChartSection storeId={storeId} />
    </div>
  );
};

export default DashboardPage;
