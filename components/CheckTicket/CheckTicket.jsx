"use client";

import { useState, useEffect } from "react";
import { MOCK_TICKETS } from "../../lib/checkticket-route/tickets";
import Link from "next/link";
import Header from "../header";
import Footer from "../footer";

// Hàm kiểm tra vé có sát giờ không (Dưới 2 tiếng)
const isNearDeparture = (ngayDi, gioDi) => {
  const [year, month, day] = ngayDi.split("-").map(Number);
  const [hours, minutes] = gioDi.split(":").map(Number);
  const departureTime = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes
  ).getTime();
  const now = new Date().getTime();
  const diffInHours = (departureTime - now) / (1000 * 60 * 60);
  return diffInHours < 2; // Trả về true nếu dưới 2 tiếng
};

export default function CheckTicket() {
  const [soDienThoai, setSoDienThoai] = useState("");
  const [errorInput, setErrorInput] = useState("");
  const [danhSachVe, setDanhSachVe] = useState(null);
  const [daTimKiem, setDaTimKiem] = useState(false);
  const [dangTai, setDangTai] = useState(false);

  // State cho Bộ lọc & Phân trang
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Hiển thị 4 vé / trang

  // State cho Modal Hủy vé
  const [showModalHuy, setShowModalHuy] = useState(false);
  const [veCanHuy, setVeCanHuy] = useState(null);
  const [maVeXacNhan, setMaVeXacNhan] = useState(""); // State cho phần nhập mã vé
  const [loiXacNhan, setLoiXacNhan] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setSoDienThoai(value);
    if (errorInput) setErrorInput("");
  };

  const handleTraCuu = (e) => {
    e.preventDefault();
    if (soDienThoai.length !== 10) {
      setErrorInput(
        "Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số."
      );
      return;
    }

    setDangTai(true);
    setDaTimKiem(false);
    setDanhSachVe(null);
    setFilterStatus("Tất cả"); // Reset bộ lọc khi tra cứu mới
    setCurrentPage(1);

    setTimeout(() => {
      const foundTickets = MOCK_TICKETS.filter(
        (t) => t.soDienThoai === soDienThoai
      );
      setDanhSachVe(foundTickets);
      setDaTimKiem(true);
      setDangTai(false);
    }, 800);
  };

  // Mở Modal hủy vé
  const openHuyVeModal = (ve) => {
    setVeCanHuy(ve);
    setMaVeXacNhan(""); // Reset ô nhập
    setLoiXacNhan("");
    setShowModalHuy(true);
  };

  // Xác nhận hủy vé (Có kiểm tra mã vé)
  const confirmHuyVe = () => {
    if (!veCanHuy) return;

    // Xác thực mã vé
    if (maVeXacNhan.trim().toUpperCase() !== veCanHuy.maVe.toUpperCase()) {
      setLoiXacNhan("Mã vé không chính xác. Vui lòng kiểm tra lại.");
      return;
    }

    // Tiến hành hủy
    if (danhSachVe) {
      const updatedList = danhSachVe.map((ve) =>
        ve.id === veCanHuy.id ? { ...ve, trangThai: "Đã hủy" } : ve
      );
      setDanhSachVe(updatedList);
    }

    // Đóng modal
    setShowModalHuy(false);
    setVeCanHuy(null);
  };

  // Logic Lọc & Phân trang
  const filteredList = danhSachVe
    ? danhSachVe.filter((ve) => {
        if (filterStatus === "Tất cả") return true;
        return ve.trangThai === filterStatus;
      })
    : [];

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f8fafc] py-12 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#0052cc]">Tra Cứu Vé Xe</h1>
            <p className="text-gray-600 mt-2">
              Nhập số điện thoại để xem lại thông tin chuyến đi của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* FORM NHẬP LIỆU */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-[#0052cc]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                Nhập thông tin tra cứu
              </h2>
              <form
                onSubmit={handleTraCuu}
                className="flex flex-col md:flex-row gap-6 items-start"
              >
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại đặt vé <span className="text-red-500">*</span>
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400 group-focus-within:text-[#0052cc] transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={soDienThoai}
                      onChange={handlePhoneChange}
                      placeholder="VD: 0901234567"
                      maxLength={10}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl text-gray-900 font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        errorInput
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#0052cc] hover:border-[#0052cc]"
                      }`}
                    />
                  </div>
                  {errorInput && (
                    <p className="text-red-500 text-sm mt-2">{errorInput}</p>
                  )}
                </div>

                <div className="w-full md:w-auto pt-7">
                  <button
                    type="submit"
                    disabled={dangTai}
                    className="w-full md:w-auto px-8 py-3 bg-[#0052cc] hover:bg-[#0040a3] text-white font-medium rounded-xl shadow-md transition-all disabled:bg-gray-400 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  >
                    {dangTai ? (
                      "Đang tra cứu..."
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        Tra cứu
                      </>
                    )}
                  </button>
                </div>
              </form>
              <p className="text-sm text-gray-400 mt-4 italic">
                * Gợi ý test: Nhập{" "}
                <strong className="text-gray-600">0901111111</strong> (3 vé),{" "}
                <strong className="text-gray-600">0905555555</strong> (7 vé).
              </p>
            </div>

            {/* Quy trình đặt vé */}
            <div className="bg-gradient-to-br from-[#0052cc] to-[#00a8ff] p-6 rounded-2xl shadow-md text-white">
              <h3 className="font-semibold text-lg mb-6 border-b border-white/20 pb-3">
                Quy trình đặt vé
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-full shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">1. Tìm chuyến xe</h4>
                    <p className="text-sm text-white/80 mt-1">
                      Chọn điểm đi, điểm đến và ngày khởi hành.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-full shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">2. Chọn ghế & Thanh toán</h4>
                    <p className="text-sm text-white/80 mt-1">
                      Chọn vị trí ngồi và hoàn tất giao dịch.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white/20 p-2 rounded-full shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">3. Nhận vé & Lên xe</h4>
                    <p className="text-sm text-white/80 mt-1">
                      Mã vé sẽ được gửi qua SMS, xuất trình khi lên xe.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* KẾT QUẢ */}
          {daTimKiem && (
            <div className="animate-fade-in-up">
              {danhSachVe && danhSachVe.length > 0 ? (
                <div>
                  {/* Thanh Bộ lọc trạng thái */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Tất cả", "Đã thanh toán", "Đã hủy"].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setFilterStatus(status);
                          setCurrentPage(1);
                        }}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                          filterStatus === status
                            ? "bg-[#0052cc] text-white shadow-md"
                            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {status} (
                        {
                          danhSachVe.filter((v) =>
                            status === "Tất cả" ? true : v.trangThai === status
                          ).length
                        }
                        )
                      </button>
                    ))}
                  </div>

                  {/* Danh sách vé (Đã phân trang) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentItems.map((ve) => {
                      const isNear = isNearDeparture(ve.ngayDi, ve.gioDi);
                      return (
                        <div
                          key={ve.id}
                          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                        >
                          <div
                            className={`h-2 w-full ${
                              ve.trangThai === "Đã thanh toán"
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          ></div>

                          <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">
                                  Mã vé
                                </p>
                                <h3 className="text-xl font-bold text-[#0052cc]">
                                  {ve.maVe}
                                </h3>
                              </div>
                              <span
                                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                                  ve.trangThai === "Đã thanh toán"
                                    ? "bg-green-50 text-green-700 border border-green-200"
                                    : "bg-gray-100 text-gray-600 border border-gray-200"
                                }`}
                              >
                                {ve.trangThai === "Đã thanh toán" ? (
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                )}
                                {ve.trangThai}
                              </span>
                            </div>

                            <div className="mb-6 pb-4 border-b border-gray-100">
                              <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <svg
                                  className="w-5 h-5 text-[#0052cc]"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                  />
                                </svg>
                                {ve.tuyenXe}
                              </h4>
                            </div>

                            <div className="space-y-3 mb-6">
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="p-1.5 bg-blue-50 rounded-md">
                                  <svg
                                    className="w-4 h-4 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                                <span className="font-medium text-gray-800">
                                  {ve.gioDi} - {ve.ngayDi}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="p-1.5 bg-blue-50 rounded-md">
                                  <svg
                                    className="w-4 h-4 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                  </svg>
                                </div>
                                <span>{ve.tenKhachHang}</span>
                              </div>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="p-1.5 bg-blue-50 rounded-md">
                                  <svg
                                    className="w-4 h-4 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                  </svg>
                                </div>
                                <span>
                                  Số lượng:{" "}
                                  <strong className="text-gray-800">
                                    {ve.soLuongGhe} ghế
                                  </strong>{" "}
                                  (Vị trí: {ve.soGhe.join(", ")})
                                </span>
                              </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                              <div>
                                <p className="text-xs text-gray-500 mb-0.5">
                                  Tổng tiền
                                </p>
                                <p className="text-xl font-bold text-[#0052cc]">
                                  {ve.tongTien.toLocaleString("vi-VN")} đ
                                </p>
                              </div>

                              {/* NÚT HỦY VÉ VÀ THÔNG BÁO SÁT GIỜ */}
                              {ve.trangThai !== "Đã hủy" &&
                                (isNear ? (
                                  <span className="text-xs text-red-500 font-medium max-w-[150px] text-right leading-tight">
                                    Không thể hủy vé sát giờ. Vui lòng gọi
                                    hotline.
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => openHuyVeModal(ve)}
                                    className="px-4 py-2 text-red-600 bg-white hover:bg-red-50 rounded-lg font-semibold text-sm transition-colors border-2 border-red-100"
                                  >
                                    Hủy vé
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Thanh Phân trang */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 font-medium text-sm"
                      >
                        Trang trước
                      </button>
                      <span className="text-gray-600 font-medium px-4">
                        Trang {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 font-medium text-sm"
                      >
                        Trang sau
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Không tìm thấy
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-2xl mx-auto">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Không tìm thấy vé!
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Số điện thoại{" "}
                    <strong className="text-gray-700">{soDienThoai}</strong>{" "}
                    chưa có lịch sử đặt vé trên hệ thống, hoặc vé đã bị xóa.
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-2.5 bg-[#0052cc] text-white font-medium rounded-lg hover:bg-[#0040a3] transition-colors"
                  >
                    Đặt vé ngay
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODAL XÁC NHẬN HỦY VÉ (CÓ NHẬP MÃ VÉ) */}
        {showModalHuy && veCanHuy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Xác nhận hủy vé
                </h3>
                <p className="text-gray-500 mt-2 text-sm">
                  Vui lòng nhập lại{" "}
                  <strong className="text-gray-700">Mã vé</strong> để xác nhận
                  hủy.
                </p>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  value={maVeXacNhan}
                  onChange={(e) => {
                    setMaVeXacNhan(e.target.value);
                    setLoiXacNhan("");
                  }}
                  placeholder={`VD: ${veCanHuy.maVe}`}
                  className={`w-full px-4 py-3 border rounded-xl text-center font-bold text-gray-900 focus:outline-none focus:ring-2 uppercase ${
                    loiXacNhan
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#0052cc]"
                  }`}
                />
                {loiXacNhan && (
                  <p className="text-red-500 text-sm mt-2 text-center">
                    {loiXacNhan}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModalHuy(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Giữ lại
                </button>
                <button
                  onClick={confirmHuyVe}
                  className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
                >
                  Xác nhận hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
