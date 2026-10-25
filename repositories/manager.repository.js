import "server-only";
// import { getFleetDashboardData } from "@/lib/fleet-data";
import { getFleetDashboardData } from "../lib/fleet-data";


let dashboardState;

async function getState() {
  if (!dashboardState) {
    dashboardState = structuredClone(await getFleetDashboardData());
  }

  return dashboardState;
}

export async function readManagerDashboard() {
  return structuredClone(await getState());
}

export async function addRoute(route) {
  const state = await getState();
  const record = { id: createId("RT"), departures: [], ...route };
  state.routes.push(record);
  return structuredClone(record);
}

export async function changeRoute(id, changes) {
  const state = await getState();
  const route = state.routes.find((item) => item.id === id);
  if (!route) return null;
  Object.assign(route, changes);
  return structuredClone(route);
}

export async function removeRoute(id) {
  const state = await getState();
  const index = state.routes.findIndex((item) => item.id === id);
  if (index < 0) return false;
  state.routes.splice(index, 1);
  return true;
}

export async function addTrip(trip) {
  const state = await getState();
  const route = state.routes.find((item) => item.id === trip.routeId);
  if (!route) return null;
  const record = {
    id: createId("TD"),
    route: `${route.origin} → ${route.destination}`,
    sold: 0,
    status: "Đang mở bán",
    ...trip,
  };
  state.trips.push(record);
  return structuredClone(record);
}

export async function changeTrip(id, changes) {
  const state = await getState();
  const trip = state.trips.find((item) => item.id === id);
  if (!trip) return null;
  Object.assign(trip, changes);
  return structuredClone(trip);
}

export async function addBus(bus) {
  const state = await getState();
  const record = { id: createId("BUS"), status: "Đang hoạt động", ...bus };
  state.buses.push(record);
  return structuredClone(record);
}

export async function changeBus(id, changes) {
  const state = await getState();
  const bus = state.buses.find((item) => item.id === id);
  if (!bus) return null;
  Object.assign(bus, changes);
  return structuredClone(bus);
}

export async function changeProfile(changes) {
  const state = await getState();
  Object.assign(state.operator, changes);
  return structuredClone(state.operator);
}

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}