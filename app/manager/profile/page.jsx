// import FleetDashboard from "@/components/fleet-dashboard";
import FleetDashboard from "../../../components/fleet-dashboard";

// import { getManagerData } from "@/services/manager.service";
import { getManagerData } from "../../../services/manager.service";


export const dynamic = "force-dynamic";

export default async function ManagerProfilePage() {
  const data = await getManagerData();
  return <FleetDashboard initialData={data} initialSection="profile"/>;
}