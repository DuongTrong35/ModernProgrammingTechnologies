export function formatCurrency(amount) {
  return `${new Intl.NumberFormat("vi-VN").format(amount)}đ`;
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" }).format(new Date(value));
}