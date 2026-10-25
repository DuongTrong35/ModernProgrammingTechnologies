import BusrouteClient from "../../components/BusRoute/BusrouteClient";
import { getBusRoutes } from "../../lib/bus-route/routes";
import "../../components/BusRoute/Busroute.css";
export default async function Page() {
  const routes = await getBusRoutes();
  return <BusrouteClient initialRoutes={routes} />;
}