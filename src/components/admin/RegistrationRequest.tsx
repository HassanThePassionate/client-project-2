import { DataTable } from "../data-table";
import data from "@/app/dashboard/data.json";
const RegistrationRequest = () => {
  return <DataTable data={data} />;
};

export default RegistrationRequest;
