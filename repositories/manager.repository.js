import "server-only";
import fs from "fs/promises";
import path from "path";
import { getFleetDashboardData } from "../lib/fleet-data";

// Đường dẫn file lưu trữ dữ liệu bền vững (JSON Persistence)
const DATA_FILE_PATH = path.join(process.cwd(), "lib", "manager-state.json");

let inMemoryState = null;

/**
 * Đọc trạng thái dữ liệu từ file JSON hoặc khởi tạo từ fleet-data
 */
async function getState() {
  if (inMemoryState) {
    return inMemoryState;
  }

  try {
    // 1. Cố gắng đọc từ file cục bộ
    const fileContent = await fs.readFile(DATA_FILE_PATH, "utf-8");
    inMemoryState = JSON.parse(fileContent);
  } catch {
    // 2. Nếu file chưa tồn tại (chạy lần đầu), nạp từ mock data gốc và ghi ra file
    inMemoryState = structuredClone(await getFleetDashboardData());
    await persistState(inMemoryState);
  }

  return inMemoryState;
}

/**
 * Lưu trạng thái vào file JSON để giữ dữ liệu khi restart server
 */
async function persistState(state) {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(state, null, 2), "utf-8");
  } catch (error) {
    console.error("Không thể ghi dữ liệu xuống file manager-state.json:", error);
  }
}

export async function readManagerDashboard() {
  return structuredClone(await getState());
}

export async function addRoute(route) {
  const state = await getState();
  const record = { id: createId("RT"), departures: [], ...route };
  state.routes.push(record);
  await persistState(state);
  return structuredClone(record);
}

export async function changeRoute(id, changes) {
  const state = await getState();
  const route = state.routes.find((item) => item.id === id);
  if (!route) return null;
  Object.assign(route, changes);
  await persistState(state);
  return structuredClone(route);
}

export async function removeRoute(id) {
  const state = await getState();
  const index = state.routes.findIndex((item) => item.id === id);
  if (index < 0) return false;
  state.routes.splice(index, 1);
  await persistState(state);
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
  await persistState(state);
  return structuredClone(record);
}

export async function changeTrip(id, changes) {
  const state = await getState();
  const trip = state.trips.find((item) => item.id === id);
  if (!trip) return null;
  Object.assign(trip, changes);
  await persistState(state);
  return structuredClone(trip);
}

export async function addBus(bus) {
  const state = await getState();
  const record = { id: createId("BUS"), status: "Đang hoạt động", ...bus };
  state.buses.push(record);
  await persistState(state);
  return structuredClone(record);
}

export async function changeBus(id, changes) {
  const state = await getState();
  const bus = state.buses.find((item) => item.id === id);
  if (!bus) return null;
  Object.assign(bus, changes);
  await persistState(state);
  return structuredClone(bus);
}

export async function changeProfile(changes) {
  const state = await getState();
  Object.assign(state.operator, changes);
  await persistState(state);
  return structuredClone(state.operator);
}

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}