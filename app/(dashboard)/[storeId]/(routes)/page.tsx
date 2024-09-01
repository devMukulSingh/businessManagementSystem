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
    <div className="px-5 py-3 space-y-5">
      <header>
        <h1 className="text-3xl font-bold">Dasboard</h1>
      </header>

      <DashboardData storeId={storeId} />
      <ChartSection storeId={storeId} />
    </div>
  );
};

export default DashboardPage;
