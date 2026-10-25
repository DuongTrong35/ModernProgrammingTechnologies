"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import type { BusRoute } from "../../lib/bus-route/routes";
import Header from "../header";
import "./Busroute.css";

// interface BusrouteClientProps {
//   initialRoutes: BusRoute[];
// }

export default function BusrouteClient({ initialRoutes }) {
  const router = useRouter();

  // =========================
  // STATE
  // =========================

  const [diemDiInput, setDiemDiInput] = useState("");
  const [diemDenInput, setDiemDenInput] = useState("");

  /*
   * Dữ liệu tuyến xe được lấy từ Server Component
   * page.tsx thông qua props initialRoutes.
   *
   * Client Component chỉ sử dụng dữ liệu này
   * để hiển thị và thực hiện thao tác tìm kiếm.
   */
  const dscd = initialRoutes;

  // =========================
  // FILTER TUYẾN XE
  // =========================

  const filteredData = dscd.filter((route) => {
    const diemDi = (route.diemdi ?? "").toLowerCase();
    const diemDen = (route.diemden ?? "").toLowerCase();

    const matchDiemDi =
      diemDiInput.trim() === "" ||
      diemDi.includes(diemDiInput.trim().toLowerCase());

    const matchDiemDen =
      diemDenInput.trim() === "" ||
      diemDen.includes(diemDenInput.trim().toLowerCase());

    return matchDiemDi && matchDiemDen;
  });

  // =========================
  // CHUYỂN SANG TRANG CHUYẾN XE
  // =========================

  const handleFindTrip = (route) => {
  router.push(
    `/trip-route?diemdi=${encodeURIComponent(route.diemdi)}&diemden=${encodeURIComponent(route.diemden)}`
  );
};

  // =========================
  // RENDER
  // =========================
  const [currentYear, setCurrentYear] = useState(null);
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <>
      {/* ==================================================
          HEADER
      ================================================== */}

      <Header />

      {/* ==================================================
          HERO
      ================================================== */}

      <main className="ld-mainn">
        <section className="ld-hero">
          <div className="ld-hero-banner">
            <div className="ld-hero-left">
              <div className="ld-hero-eyebrow">Long Distance Bus Lines</div>
              <h1 className="ld-hero-title">
                Vững tin trên mọi chặng đường dài
              </h1>
              <p className="ld-hero-sub">
                Mạng lưới xe khách liên tỉnh, trung chuyển tận nơi và dịch vụ
                chăm sóc khách hàng tận tâm, giúp hành trình của bạn luôn an
                toàn và thoải mái.
              </p>
              <div className="ld-hero-pill">
                <span className="ld-hero-pill-number">{dscd.length}</span>
                <span className="ld-hero-pill-text">
                  Tuyến xe hoạt động mỗi ngày
                </span>
              </div>
            </div>
            <div className="ld-hero-right">
              <div className="ld-hero-city" />
              <div className="ld-hero-bus-shadow" />
              <div className="ld-hero-bus">
                <div className="ld-hero-bus-top">
                  <div className="ld-hero-bus-window-row">
                    <div className="ld-hero-bus-window" />
                    <div className="ld-hero-bus-window" />
                    <div className="ld-hero-bus-window" />
                  </div>
                </div>
                <div className="ld-hero-bus-door" />
                <div className="ld-hero-bus-wheel ld-hero-bus-wheel--front" />
                <div className="ld-hero-bus-wheel ld-hero-bus-wheel--back" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================
          SEARCH + ROUTE TABLE
      ================================================== */}

      <section className="page" style={{ marginTop: "30px" }}>
        <div className="container">
          {/* SEARCH */}

          <div className="search-box">
            <input
              type="text"
              placeholder="Nhập điểm đi"
              aria-label="Nhập điểm đi"
              value={diemDiInput}
              onChange={(e) => setDiemDiInput(e.target.value)}
            />

            <span className="search-swap" aria-hidden="true">
              ⇄
            </span>

            <input
              type="text"
              placeholder="Nhập điểm đến"
              aria-label="Nhập điểm đến"
              value={diemDenInput}
              onChange={(e) => setDiemDenInput(e.target.value)}
            />
          </div>

          {/* ROUTE TABLE */}

          <div className="table">
            {/* TABLE HEADER */}

            <div className="table-header">
              <div>Tuyến xe</div>

              <div className="table-header-center">Quãng đường</div>

              <div className="table-header-center">Thời gian hành trình</div>

              <div className="table-header-center">Thao tác</div>
            </div>

            {/* DATA */}

            {filteredData.length > 0 ? (
              filteredData.map((route) => (
                <div className="table-row" key={route.id}>
                  {/* ROUTE */}

                  <div className="route">
                    <span className="route-from">{route.diemdi}</span>

                    <span className="route-arrow">⇄</span>

                    <span className="route-to">{route.diemden}</span>
                  </div>

                  {/* DISTANCE */}

                  <div className="table-cell-center">
                    <span className="route-value">{route.quangduong}</span>

                    <span className="route-unit">km</span>
                  </div>

                  {/* TIME */}

                  <div className="table-cell-center">
                    <span className="route-time-icon">◷</span>

                    {route.thoigian}
                  </div>

                  {/* BUTTON */}

                  <div className="table-cell-center">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleFindTrip(route)}
                    >
                      Tìm chuyến xe
                    </button>
                  </div>
                </div>
              ))
            ) : (
              /* EMPTY */

              <div className="empty-state empty-state-no-data">
                <div className="empty-icon">⇄</div>

                <strong>Không tìm thấy tuyến xe</strong>

                <span>Vui lòng kiểm tra lại điểm đi hoặc điểm đến.</span>
              </div>
            )}
          </div>

          {/* RESULT COUNT */}

          <div className="result-count">
            Hiển thị <strong>{filteredData.length}</strong> /{" "}
            <strong>{dscd.length}</strong> tuyến xe
          </div>
        </div>
      </section>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="ld-footer" style={{marginBottom:"0px"}}>
        <div className="ld-footer-inner">
          {/* COLUMN 1 */}

          <div className="ld-footer-col">
            <h4>Trung tâm tổng đài &amp; CSKH</h4>

            <div className="ld-footer-phone">1900 0000</div>

            <p className="ld-footer-text">
              CÔNG TY CỔ PHẦN XE KHÁCH LONG DISTANCE BUS
            </p>

            <p className="ld-footer-text">
              Địa chỉ: 123 Đường Quốc Lộ, Quận 7, TP. Hồ Chí Minh, Việt Nam
            </p>

            <p className="ld-footer-text">
              Email:{" "}
              <a href="mailto:support@longdistancebus.vn">
                support@longdistancebus.vn
              </a>
            </p>
          </div>

          {/* COLUMN 2 */}

          <div className="ld-footer-col">
            <h4>Long Distance Bus</h4>

            <ul>
              <li>
                <Link href="/about">Về chúng tôi</Link>
              </li>

              <li>
                <Link href="/BusRoute">Lịch trình</Link>
              </li>

              <li>
                <Link href="/careers">Tuyển dụng</Link>
              </li>

              <li>
                <Link href="/news">Tin tức &amp; sự kiện</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 */}

          <div className="ld-footer-col">
            <h4>Hỗ trợ</h4>

            <ul>
              <li>
                <Link href="/trips">Tra cứu thông tin đặt vé</Link>
              </li>

              <li>
                <Link href="/terms">Điều khoản sử dụng</Link>
              </li>

              <li>
                <Link href="/faq">Câu hỏi thường gặp</Link>
              </li>

              <li>
                <Link href="/guide">Hướng dẫn đặt vé trên web</Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 */}

          <div className="ld-footer-col">
            <h4>Tải app Long Distance Bus</h4>

            <div className="ld-footer-apps">
              <button type="button" className="ld-app-btn">
                CH Play
              </button>

              <button type="button" className="ld-app-btn">
                App Store
              </button>
            </div>

            <p className="ld-footer-text">Kết nối với chúng tôi</p>

            <div className="ld-footer-social">
              <span>𝕗</span>

              <span>▶</span>

              <span>📷</span>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}

        <div className="ld-footer-bottom">
          © {currentYear ?? ""} Long Distance Bus — Chất lượng là danh dự
        </div>
      </footer>
    </>
  );
}
