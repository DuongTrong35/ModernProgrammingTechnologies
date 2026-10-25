const tripStatuses = new Set(["Đang mở bán", "Sắp khởi hành", "Đã khởi hành", "Đã hủy"]);
const busStatuses = new Set(["Đang hoạt động", "Bảo dưỡng"]);

export function validateRoute(input) {
  const errors = {};
  if (!text(input.origin)) errors.origin = "Điểm đi là bắt buộc.";
  if (!text(input.destination)) errors.destination = "Điểm đến là bắt buộc.";
  if (!positiveNumber(input.distance)) errors.distance = "Khoảng cách phải lớn hơn 0.";
  if (!text(input.duration)) errors.duration = "Thời gian dự kiến là bắt buộc.";
  if (!positiveNumber(input.fare)) errors.fare = "Giá vé phải lớn hơn 0.";
  return errors;
}

export function validateTrip(input) {
  const errors = {};
  for (const field of ["routeId", "bus", "plate", "departure", "date"]) {
    if (!text(input[field])) errors[field] = `${field} là bắt buộc.`;
  }
  if (!positiveNumber(input.capacity)) errors.capacity = "Sức chứa phải lớn hơn 0.";
  if (input.status !== undefined && !tripStatuses.has(input.status)) errors.status = "Trạng thái chuyến không hợp lệ.";
  return errors;
}

export function validateBus(input) {
  const errors = {};
  for (const field of ["name", "plate", "type", "driver", "phone"]) {
    if (!text(input[field])) errors[field] = `${field} là bắt buộc.`;
  }
  if (!positiveNumber(input.seats)) errors.seats = "Số chỗ phải lớn hơn 0.";
  if (input.status !== undefined && !busStatuses.has(input.status)) errors.status = "Trạng thái xe không hợp lệ.";
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