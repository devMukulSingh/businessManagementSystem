import { getGraphRevenue } from "@/actions/get-graph-revenue";
import Chart from "./Chart";

interface ChartSectionProps {
  storeId: string;
}

const ChartSection: React.FC<ChartSectionProps> = async ({ storeId }) => {
  const graphData = await getGraphRevenue(storeId);

  return <Chart graphData={graphData} />;
};

export default ChartSection;
