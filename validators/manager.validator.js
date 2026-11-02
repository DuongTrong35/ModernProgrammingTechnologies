const tripStatuses = new Set(["Đang mở bán", "Sắp khởi hành", "Đã khởi hành", "Đã hủy"]);
const busStatuses = new Set(["Đang hoạt động", "Bảo dưỡng"]);

// Ma trận chuyển trạng thái hợp lệ cho chuyến xe
export const TRIP_STATUS_TRANSITIONS = {
  "Đang mở bán": ["Sắp khởi hành", "Đã hủy"],
  "Sắp khởi hành": ["Đã khởi hành", "Đã hủy"],
  "Đã khởi hành": [], // Đã chạy thì không thể quay lại mở bán hay hủy
  "Đã hủy": [],       // Đã hủy là trạng thái kết thúc
};

/**
 * Kiểm tra quy tắc chuyển đổi trạng thái chuyến xe
 * Trả về { valid: true } hoặc { valid: false, code: 400 | 422, message: string }
 */
export function validateTripStatusTransition(currentStatus, nextStatus) {
  if (!text(nextStatus)) {
    return {
      valid: false,
      code: 400,
      message: "Trạng thái mới không được để trống.",
    };
  }

  if (!tripStatuses.has(nextStatus)) {
    return {
      valid: false,
      code: 400,
      message: `Trạng thái '${nextStatus}' không tồn tại trong hệ thống.`,
    };
  }

  // Trường hợp gửi lại cùng một trạng thái (Idempotency check)
  if (currentStatus === nextStatus) {
    return {
      valid: false,
      code: 422,
      message: `Chuyến xe đã ở trạng thái '${currentStatus}', không thể chuyển đổi trùng lặp.`,
    };
  }

  const allowedNext = TRIP_STATUS_TRANSITIONS[currentStatus] || [];

  // Trường hợp chuyển trạng thái không được phép
  if (!allowedNext.includes(nextStatus)) {
    return {
      valid: false,
      code: 422,
      message: `Không được phép chuyển từ '${currentStatus}' sang '${nextStatus}'. Các trạng thái hợp lệ tiếp theo: [${allowedNext.length > 0 ? allowedNext.join(", ") : "Không còn trạng thái tiếp theo"}].`,
    };
  }

  return { valid: true };
}

export function validateRoute(input) {
  const errors = {};

  if (!text(input.origin)) {
    errors.origin = "Điểm đi là bắt buộc.";
  }

  if (!text(input.destination)) {
    errors.destination = "Điểm đến là bắt buộc.";
  }

  if (
    text(input.origin) &&
    text(input.destination) &&
    input.origin.trim().toLowerCase() ===
      input.destination.trim().toLowerCase()
  ) {
    errors.destination = "Điểm đến phải khác điểm đi.";
  }

  if (!positiveNumber(input.distance)) {
    errors.distance = "Khoảng cách phải lớn hơn 0.";
  }

  if (!text(input.duration)) {
    errors.duration = "Thời gian dự kiến là bắt buộc.";
  }

  if (!positiveNumber(input.fare)) {
    errors.fare = "Giá vé phải lớn hơn 0.";
  }

  return errors;
}

export function validateTrip(input) {
  const errors = {};
  for (const field of ["routeId", "bus", "plate", "departure", "date"]) {
    if (!text(input[field])) errors[field] = `${field} là bắt buộc.`;
  }
  if (!positiveNumber(input.capacity)) errors.capacity = "Sức chứa phải lớn hơn 0.";
  if (input.status !== undefined && !tripStatuses.has(input.status)) {
    errors.status = "Trạng thái chuyến không hợp lệ.";
  }
  return errors;
}

export function validateBus(input) {
  const errors = {};
  for (const field of ["name", "plate", "type", "driver", "phone"]) {
    if (!text(input[field])) errors[field] = `${field} là bắt buộc.`;
  }
  if (!positiveNumber(input.seats)) errors.seats = "Số chỗ phải lớn hơn 0.";
  if (input.status !== undefined && !busStatuses.has(input.status)) {
    errors.status = "Trạng thái xe không hợp lệ.";
  }
  return errors;
}

export function validateProfile(input) {
  const errors = {};
  for (const field of ["name", "hotline", "address", "policy"]) {
    if (!text(input[field])) errors[field] = `${field} là bắt buộc.`;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(input.email ?? ""))) {
    errors.email = "Email không hợp lệ.";
  }
  return errors;
}

function text(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function positiveNumber(value) {
  return Number.isFinite(Number(value)) && Number(value) > 0;
}