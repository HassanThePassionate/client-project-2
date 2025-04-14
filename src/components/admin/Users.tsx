import { DataTable } from "../data-table";
import data from "@/app/dashboard/data.json";
const Users = () => {
  return <DataTable data={data} />;
};

export default Users;
