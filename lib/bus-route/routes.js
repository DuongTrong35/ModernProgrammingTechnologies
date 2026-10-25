import "server-only";

export const SAMPLE_ROUTES = [
  {
    id: 1,
    diemdi: "TP. Hồ Chí Minh",
    diemden: "Đà Lạt",
    quangduong: 300,
    thoigian: "6 giờ",
    giave: 250000,
  },
  {
    id: 2,
    diemdi: "TP. Hồ Chí Minh",
    diemden: "Cần Thơ",
    quangduong: 170,
    thoigian: "3 giờ 30 phút",
    giave: 180000,
  },
  {
    id: 3,
    diemdi: "TP. Hồ Chí Minh",
    diemden: "Nha Trang",
    quangduong: 430,
    thoigian: "8 giờ",
    giave: 350000,
  },
];

export async function getBusRoutes() {
  return SAMPLE_ROUTES;
}