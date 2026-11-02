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

import {
  validateBus,
  validateProfile,
  validateRoute,
  validateTrip,
  validateTripStatusTransition,
} from "../validators/manager.validator";

export const getManagerData = readManagerDashboard;

export async function createManagerRoute(input) {
  const errors = validateRoute(input);
  if (Object.keys(errors).length) return { errors, status: 400 };
  return {
    data: await addRoute({
      origin: input.origin.trim(),
      destination: input.destination.trim(),
      distance: Number(input.distance),
      duration: input.duration.trim(),
      fare: Number(input.fare),
      departures: Array.isArray(input.departures) ? input.departures : [],
    }),
  };
}

export async function updateManagerRoute(id, input) {
  const errors = validateRoute(input);
  if (Object.keys(errors).length) return { errors, status: 400 };
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
  if (Object.keys(errors).length) return { errors, status: 400 };
  const data = await addTrip({ ...input, capacity: Number(input.capacity) });
  return data ? { data } : { notFound: true };
}

export async function updateManagerTrip(id, input) {
  // 1. Kiểm tra tham số đầu vào cơ bản
  if (!input || !input.status) {
    return {
      errors: { status: "Trường 'status' là bắt buộc khi cập nhật chuyến xe." },
      status: 400,
    };
  }

  // 2. Tìm bản ghi hiện tại để kiểm tra tồn tại và lấy trạng thái ban đầu
  const dashboard = await readManagerDashboard();
  const existingTrip = (dashboard.trips || []).find((t) => String(t.id) === String(id));

  if (!existingTrip) {
    return { notFound: true }; // 404 Not Found
  }

  const previousStatus = existingTrip.status;
  const targetStatus = input.status.trim();

  // 3. Kiểm tra logic chuyển đổi trạng thái bằng Validator
  const transitionCheck = validateTripStatusTransition(previousStatus, targetStatus);
  if (!transitionCheck.valid) {
    return {
      errors: { status: transitionCheck.message },
      status: transitionCheck.code, // Sẽ trả về 400 hoặc 422 chuẩn nghiệp vụ
      isInvalidTransition: transitionCheck.code === 422,
    };
  }

  // 4. Lưu cập nhật trạng thái mới
  const updatedData = await changeTrip(id, { status: targetStatus });

  // 5. Trả về data kèm trace log rõ ràng cho báo cáo
  return {
    data: updatedData,
    trace: {
      tripId: id,
      previousStatus: previousStatus,
      currentStatus: targetStatus,
      updatedAt: new Date().toISOString(),
    },
  };
}

export async function createManagerBus(input) {
  const errors = validateBus(input);
  if (Object.keys(errors).length) return { errors, status: 400 };
  return {
    data: await addBus({
      name: input.name.trim(),
      plate: input.plate.trim(),
      type: input.type.trim(),
      seats: Number(input.seats),
      driver: input.driver.trim(),
      phone: input.phone.trim(),
    }),
  };
}

export async function updateManagerBus(id, input) {
  const errors = validateBus(input);
  if (Object.keys(errors).length) return { errors, status: 400 };
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
  if (Object.keys(errors).length) return { errors, status: 400 };
  return {
    data: await changeProfile({
      name: input.name.trim(),
      hotline: input.hotline.trim(),
      email: input.email.trim(),
      address: input.address.trim(),
      policy: input.policy.trim(),
    }),
  };
}