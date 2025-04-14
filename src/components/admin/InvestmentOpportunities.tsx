import { DataTable } from "../data-table";
import data from "@/app/dashboard/data.json";
const InvestmentOpportunities = () => {
  return <DataTable data={data} />;
};

export default InvestmentOpportunities;
