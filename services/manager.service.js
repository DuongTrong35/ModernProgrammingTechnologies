import "server-only";
import {
  addBus,
  addRoute,
  addTrip,
  changeBus,
  changeProfile,
  changeRoute,
  changeTrip,
  readManagerDashboard,
  removeRoute,
} from "../repositories/manager.repository";

import { validateBus, validateProfile, validateRoute, validateTrip } from "../validators/manager.validator";

export const getManagerData = readManagerDashboard;

export async function createManagerRoute(input) {
  const errors = validateRoute(input);
  if (Object.keys(errors).length) return { errors };
  return { data: await addRoute({
    origin: input.origin.trim(),
    destination: input.destination.trim(),
    distance: Number(input.distance),
    duration: input.duration.trim(),
    fare: Number(input.fare),
    departures: Array.isArray(input.departures) ? input.departures : [],
  }) };
}

export async function updateManagerRoute(id, input) {
  const errors = validateRoute(input);
  if (Object.keys(errors).length) return { errors };
  const data = await changeRoute(id, {
    origin: input.origin.trim(),
    destination: input.destination.trim(),
    distance: Number(input.distance),
    duration: input.duration.trim(),
    fare: Number(input.fare),
    departures: Array.isArray(input.departures) ? input.departures : [],
  });
  return data ? { data } : { notFound: true };
}

export async function deleteManagerRoute(id) {
  return (await removeRoute(id)) ? { deleted: true } : { notFound: true };
}

export async function createManagerTrip(input) {
  const errors = validateTrip(input);
  if (Object.keys(errors).length) return { errors };
  const data = await addTrip({ ...input, capacity: Number(input.capacity) });
  return data ? { data } : { notFound: true };
}

export async function updateManagerTrip(id, input) {
  if (!tripStatusIsValid(input.status)) return { errors: { status: "Trạng thái chuyến không hợp lệ." } };
  const data = await changeTrip(id, { status: input.status });
  return data ? { data } : { notFound: true };
}

export async function createManagerBus(input) {
  const errors = validateBus(input);
  if (Object.keys(errors).length) return { errors };
  return { data: await addBus({
    name: input.name.trim(),
    plate: input.plate.trim(),
    type: input.type.trim(),
    seats: Number(input.seats),
    driver: input.driver.trim(),
    phone: input.phone.trim(),
  }) };
}

export async function updateManagerBus(id, input) {
  const errors = validateBus(input);
  if (Object.keys(errors).length) return { errors };
  const data = await changeBus(id, {
    name: input.name.trim(),
    plate: input.plate.trim(),
    type: input.type.trim(),
    seats: Number(input.seats),
    driver: input.driver.trim(),
    phone: input.phone.trim(),
    ...(input.status ? { status: input.status } : {}),
  });
  return data ? { data } : { notFound: true };
}

export async function updateManagerProfile(input) {
  const errors = validateProfile(input);
  if (Object.keys(errors).length) return { errors };
  return { data: await changeProfile({
    name: input.name.trim(),
    hotline: input.hotline.trim(),
    email: input.email.trim(),
    address: input.address.trim(),
    policy: input.policy.trim(),
  }) };
}

function tripStatusIsValid(status) {
  return validateTrip({ routeId: "route", bus: "bus", plate: "plate", departure: "time", date: "date", capacity: 1, status }).status === undefined;
}