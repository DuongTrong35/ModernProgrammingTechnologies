// import FleetDashboard from "@/components/fleet-dashboard";
import FleetDashboard from "../../../components/fleet-dashboard";

// import { getManagerData } from "@/services/manager.service";
import { getManagerData } from "../../../services/manager.service";


export const dynamic = "force-dynamic";

export default async function ManagerRoutesPage({ searchParams }) {
  const [data, query] = await Promise.all([getManagerData(), searchParams]);
  const initialSection = query.view === "trips" ? "trips" : "routes";
  return <FleetDashboard initialData={data} initialSection={initialSection}/>;
}