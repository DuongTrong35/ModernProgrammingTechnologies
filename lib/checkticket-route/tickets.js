// lib/data/tickets.ts

// export interface Ticket {
//   id: string;
//   maVe: string;
//   soDienThoai: string;
//   tenKhachHang: string;
//   tuyenXe: string;
//   ngayDi: string; // Định dạng YYYY-MM-DD để dễ tính toán
//   gioDi: string;  // HH:mm
//   soLuongGhe: number;
//   soGhe: string[];
//   trangThai: 'Đã thanh toán' | 'Đã hủy';
//   tongTien: number;
//   diemDon: string;
//   diemTra: string;
// }

export const MOCK_TICKETS = [  // 1. Hành khách A: 3 vé (1 đã hủy, 1 sắp chạy < 2h, 1 xa ngày)
  {
    id: "1", maVe: "KB-001", soDienThoai: "0901111111", tenKhachHang: "Nguyễn Văn A",
    tuyenXe: "TP. Hồ Chí Minh — Đà Lạt", ngayDi: "2026-11-20", gioDi: "08:00", soLuongGhe: 2, soGhe: ["A01", "A02"],
    trangThai: "Đã thanh toán", tongTien: 580000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Lạt"
  },
  {
    id: "2", maVe: "KB-002", soDienThoai: "0901111111", tenKhachHang: "Nguyễn Văn A",
    tuyenXe: "TP. Hồ Chí Minh — Cần Thơ", ngayDi: "2026-11-20", gioDi: "09:00", soLuongGhe: 1, soGhe: ["B05"],
    trangThai: "Đã thanh toán", tongTien: 290000, diemDon: "Bến xe Miền Tây", diemTra: "Bến xe Cần Thơ"
  },
  {
    id: "3", maVe: "KB-003", soDienThoai: "0901111111", tenKhachHang: "Nguyễn Văn A",
    tuyenXe: "TP. Hồ Chí Minh — Nha Trang", ngayDi: "2026-11-20", gioDi: "20:00", soLuongGhe: 1, soGhe: ["C10"],
    trangThai: "Đã hủy", tongTien: 350000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Nha Trang"
  },

  // 2. Hành khách B: 4 vé (Có 1 vé sát giờ < 2h để test)
  {
    id: "4", maVe: "KB-004", soDienThoai: "0902222222", tenKhachHang: "Trần Thị B",
    tuyenXe: "TP. Hồ Chí Minh — Đà Nẵng", ngayDi: "2026-11-20", gioDi: "22:00", soLuongGhe: 2, soGhe: ["D01", "D02"],
    trangThai: "Đã thanh toán", tongTien: 900000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Nẵng"
  },
  {
    id: "5", maVe: "KB-005", soDienThoai: "0902222222", tenKhachHang: "Trần Thị B",
    tuyenXe: "TP. Hồ Chí Minh — Vũng Tàu", ngayDi: "2026-11-21", gioDi: "07:00", soLuongGhe: 1, soGhe: ["E05"],
    trangThai: "Đã thanh toán", tongTien: 180000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Vũng Tàu"
  },
  {
    id: "6", maVe: "KB-006", soDienThoai: "0902222222", tenKhachHang: "Trần Thị B",
    tuyenXe: "TP. Hồ Chí Minh — Đà Lạt", ngayDi: "2026-11-20", gioDi: "23:30", soLuongGhe: 1, soGhe: ["F10"],
    trangThai: "Đã thanh toán", tongTien: 290000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Lạt"
  },
  {
    id: "7", maVe: "KB-007", soDienThoai: "0902222222", tenKhachHang: "Trần Thị B",
    tuyenXe: "TP. Hồ Chí Minh — Phan Thiết", ngayDi: "2026-11-22", gioDi: "08:00", soLuongGhe: 2, soGhe: ["G01", "G02"],
    trangThai: "Đã hủy", tongTien: 400000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Phan Thiết"
  },

  // 3. Hành khách C: 5 vé
  {
    id: "8", maVe: "KB-008", soDienThoai: "0903333333", tenKhachHang: "Lê Văn C",
    tuyenXe: "TP. Hồ Chí Minh — Cần Thơ", ngayDi: "2026-11-20", gioDi: "14:00", soLuongGhe: 1, soGhe: ["H01"],
    trangThai: "Đã thanh toán", tongTien: 290000, diemDon: "Bến xe Miền Tây", diemTra: "Bến xe Cần Thơ"
  },
  {
    id: "9", maVe: "KB-009", soDienThoai: "0903333333", tenKhachHang: "Lê Văn C",
    tuyenXe: "TP. Hồ Chí Minh — Đà Lạt", ngayDi: "2026-11-23", gioDi: "09:00", soLuongGhe: 2, soGhe: ["I01", "I02"],
    trangThai: "Đã thanh toán", tongTien: 580000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Lạt"
  },
  {
    id: "10", maVe: "KB-010", soDienThoai: "0903333333", tenKhachHang: "Lê Văn C",
    tuyenXe: "TP. Hồ Chí Minh — Nha Trang", ngayDi: "2026-11-24", gioDi: "20:00", soLuongGhe: 1, soGhe: ["J05"],
    trangThai: "Đã hủy", tongTien: 350000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Nha Trang"
  },
  {
    id: "11", maVe: "KB-011", soDienThoai: "0903333333", tenKhachHang: "Lê Văn C",
    tuyenXe: "TP. Hồ Chí Minh — Đà Nẵng", ngayDi: "2026-11-25", gioDi: "08:00", soLuongGhe: 1, soGhe: ["K01"],
    trangThai: "Đã thanh toán", tongTien: 450000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Nẵng"
  },
  {
    id: "12", maVe: "KB-012", soDienThoai: "0903333333", tenKhachHang: "Lê Văn C",
    tuyenXe: "TP. Hồ Chí Minh — Vũng Tàu", ngayDi: "2026-11-26", gioDi: "07:00", soLuongGhe: 2, soGhe: ["L01", "L02"],
    trangThai: "Đã thanh toán", tongTien: 360000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Vũng Tàu"
  },

  // 4. Hành khách D: 6 vé
  {
    id: "13", maVe: "KB-013", soDienThoai: "0904444444", tenKhachHang: "Phạm Thị D",
    tuyenXe: "TP. Hồ Chí Minh — Phan Thiết", ngayDi: "2026-11-20", gioDi: "10:00", soLuongGhe: 1, soGhe: ["M01"],
    trangThai: "Đã thanh toán", tongTien: 200000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Phan Thiết"
  },
  {
    id: "14", maVe: "KB-014", soDienThoai: "0904444444", tenKhachHang: "Phạm Thị D",
    tuyenXe: "TP. Hồ Chí Minh — Đà Lạt", ngayDi: "2026-11-27", gioDi: "08:00", soLuongGhe: 3, soGhe: ["N01", "N02", "N03"],
    trangThai: "Đã thanh toán", tongTien: 870000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Lạt"
  },
  {
    id: "15", maVe: "KB-015", soDienThoai: "0904444444", tenKhachHang: "Phạm Thị D",
    tuyenXe: "TP. Hồ Chí Minh — Cần Thơ", ngayDi: "2026-11-28", gioDi: "14:00", soLuongGhe: 1, soGhe: ["O05"],
    trangThai: "Đã thanh toán", tongTien: 290000, diemDon: "Bến xe Miền Tây", diemTra: "Bến xe Cần Thơ"
  },
  {
    id: "16", maVe: "KB-016", soDienThoai: "0904444444", tenKhachHang: "Phạm Thị D",
    tuyenXe: "TP. Hồ Chí Minh — Nha Trang", ngayDi: "2026-11-29", gioDi: "20:00", soLuongGhe: 1, soGhe: ["P10"],
    trangThai: "Đã thanh toán", tongTien: 350000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Nha Trang"
  },
  {
    id: "17", maVe: "KB-017", soDienThoai: "0904444444", tenKhachHang: "Phạm Thị D",
    tuyenXe: "TP. Hồ Chí Minh — Đà Nẵng", ngayDi: "2026-11-30", gioDi: "09:00", soLuongGhe: 2, soGhe: ["Q01", "Q02"],
    trangThai: "Đã hủy", tongTien: 900000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Nẵng"
  },
  {
    id: "18", maVe: "KB-018", soDienThoai: "0904444444", tenKhachHang: "Phạm Thị D",
    tuyenXe: "TP. Hồ Chí Minh — Vũng Tàu", ngayDi: "2026-12-01", gioDi: "07:00", soLuongGhe: 1, soGhe: ["R05"],
    trangThai: "Đã thanh toán", tongTien: 180000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Vũng Tàu"
  },

  // 5. Hành khách E: 7 vé
  {
    id: "19", maVe: "KB-019", soDienThoai: "0905555555", tenKhachHang: "Hoàng Văn E",
    tuyenXe: "TP. Hồ Chí Minh — Đà Lạt", ngayDi: "2026-11-20", gioDi: "08:00", soLuongGhe: 1, soGhe: ["S01"],
    trangThai: "Đã thanh toán", tongTien: 290000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Lạt"
  },
  {
    id: "20", maVe: "KB-020", soDienThoai: "0905555555", tenKhachHang: "Hoàng Văn E",
    tuyenXe: "TP. Hồ Chí Minh — Cần Thơ", ngayDi: "2026-11-21", gioDi: "14:00", soLuongGhe: 2, soGhe: ["T01", "T02"],
    trangThai: "Đã thanh toán", tongTien: 580000, diemDon: "Bến xe Miền Tây", diemTra: "Bến xe Cần Thơ"
  },
  {
    id: "21", maVe: "KB-021", soDienThoai: "0905555555", tenKhachHang: "Hoàng Văn E",
    tuyenXe: "TP. Hồ Chí Minh — Nha Trang", ngayDi: "2026-11-22", gioDi: "20:00", soLuongGhe: 1, soGhe: ["U05"],
    trangThai: "Đã hủy", tongTien: 350000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Nha Trang"
  },
  {
    id: "22", maVe: "KB-022", soDienThoai: "0905555555", tenKhachHang: "Hoàng Văn E",
    tuyenXe: "TP. Hồ Chí Minh — Đà Nẵng", ngayDi: "2026-11-23", gioDi: "09:00", soLuongGhe: 1, soGhe: ["V10"],
    trangThai: "Đã thanh toán", tongTien: 450000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Nẵng"
  },
  {
    id: "23", maVe: "KB-023", soDienThoai: "0905555555", tenKhachHang: "Hoàng Văn E",
    tuyenXe: "TP. Hồ Chí Minh — Vũng Tàu", ngayDi: "2026-11-24", gioDi: "07:00", soLuongGhe: 1, soGhe: ["W01"],
    trangThai: "Đã thanh toán", tongTien: 180000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Vũng Tàu"
  },
  {
    id: "24", maVe: "KB-024", soDienThoai: "0905555555", tenKhachHang: "Hoàng Văn E",
    tuyenXe: "TP. Hồ Chí Minh — Phan Thiết", ngayDi: "2026-11-25", gioDi: "10:00", soLuongGhe: 2, soGhe: ["X01", "X02"],
    trangThai: "Đã thanh toán", tongTien: 400000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Phan Thiết"
  },
  {
    id: "25", maVe: "KB-025", soDienThoai: "0905555555", tenKhachHang: "Hoàng Văn E",
    tuyenXe: "TP. Hồ Chí Minh — Cần Thơ", ngayDi: "2026-11-26", gioDi: "14:00", soLuongGhe: 1, soGhe: ["Y05"],
    trangThai: "Đã thanh toán", tongTien: 290000, diemDon: "Bến xe Miền Tây", diemTra: "Bến xe Cần Thơ"
  },

  // 6. Hành khách F: 4 vé (Có vé sát giờ)
  {
    id: "26", maVe: "KB-026", soDienThoai: "0906666666", tenKhachHang: "Đinh Thị F",
    tuyenXe: "TP. Hồ Chí Minh — Đà Lạt", ngayDi: "2026-11-20", gioDi: "21:00", soLuongGhe: 1, soGhe: ["Z01"],
    trangThai: "Đã thanh toán", tongTien: 290000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Lạt"
  },
  {
    id: "27", maVe: "KB-027", soDienThoai: "0906666666", tenKhachHang: "Đinh Thị F",
    tuyenXe: "TP. Hồ Chí Minh — Cần Thơ", ngayDi: "2026-11-27", gioDi: "14:00", soLuongGhe: 1, soGhe: ["A11"],
    trangThai: "Đã thanh toán", tongTien: 290000, diemDon: "Bến xe Miền Tây", diemTra: "Bến xe Cần Thơ"
  },
  {
    id: "28", maVe: "KB-028", soDienThoai: "0906666666", tenKhachHang: "Đinh Thị F",
    tuyenXe: "TP. Hồ Chí Minh — Nha Trang", ngayDi: "2026-11-28", gioDi: "20:00", soLuongGhe: 2, soGhe: ["B11", "B12"],
    trangThai: "Đã thanh toán", tongTien: 700000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Nha Trang"
  },
  {
    id: "29", maVe: "KB-029", soDienThoai: "0906666666", tenKhachHang: "Đinh Thị F",
    tuyenXe: "TP. Hồ Chí Minh — Đà Nẵng", ngayDi: "2026-11-29", gioDi: "09:00", soLuongGhe: 1, soGhe: ["C11"],
    trangThai: "Đã hủy", tongTien: 450000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Nẵng"
  },

  // 7. Hành khách G: 3 vé
  {
    id: "30", maVe: "KB-030", soDienThoai: "0907777777", tenKhachHang: "Vũ Văn G",
    tuyenXe: "TP. Hồ Chí Minh — Vũng Tàu", ngayDi: "2026-11-20", gioDi: "07:00", soLuongGhe: 1, soGhe: ["D11"],
    trangThai: "Đã thanh toán", tongTien: 180000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Vũng Tàu"
  },
  {
    id: "31", maVe: "KB-031", soDienThoai: "0907777777", tenKhachHang: "Vũ Văn G",
    tuyenXe: "TP. Hồ Chí Minh — Đà Lạt", ngayDi: "2026-11-30", gioDi: "08:00", soLuongGhe: 2, soGhe: ["E11", "E12"],
    trangThai: "Đã thanh toán", tongTien: 580000, diemDon: "Bến xe Miền Đông", diemTra: "Bến xe Đà Lạt"
  },
  {
    id: "32", maVe: "KB-032", soDienThoai: "0907777777", tenKhachHang: "Vũ Văn G",
    tuyenXe: "TP. Hồ Chí Minh — Cần Thơ", ngayDi: "2026-12-01", gioDi: "14:00", soLuongGhe: 1, soGhe: ["F11"],
    trangThai: "Đã hủy", tongTien: 290000, diemDon: "Bến xe Miền Tây", diemTra: "Bến xe Cần Thơ"
  }
];