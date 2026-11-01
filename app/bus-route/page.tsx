import BusrouteClient from "../../components/BusRoute/BusrouteClient";
import { getBusRoutes } from "../../lib/bus-route/routes";
export default async function Page() {
  const routes = await getBusRoutes();
  return <BusrouteClient initialRoutes={routes} />;
}