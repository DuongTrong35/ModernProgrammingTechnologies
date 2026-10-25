"use client";

import Link from "next/link";
import "./Home.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Header from "../header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="ld-main">
        {/* ================= BANNER ================= */}
        <section className="ld-home-banner">
          <img
            src="../../assets/images/Bannerhome.png"
            alt="Konoha Bus"
            className="ld-home-banner-img"
          />
        </section>

        {/* ================= SEARCH BOX ================= */}
        <section className="ld-search-wrapper">
          <div className="ld-search-box">
            {/* SEARCH TOP */}
            <div className="ld-search-top">
              <div className="ld-trip-types">
                <label className="ld-radio-item">
                  <input
                    type="radio"
                    name="tripType"
                    value="oneway"
                    defaultChecked
                  />

                  <span>Một chiều</span>
                </label>

                <label className="ld-radio-item">
                  <input type="radio" name="tripType" value="roundtrip" />

                  <span>Khứ hồi</span>
                </label>
              </div>

              <button type="button" className="ld-buy-guide">
                Hướng dẫn mua vé
              </button>
            </div>

            {/* ================= SEARCH FORM ================= */}
            <div className="ld-search-form">
              {/* Điểm đi */}
              <div className="ld-search-field">
                <label>Điểm đi</label>

                <div className="ld-input-box">
                  <input type="text" placeholder="Chọn điểm đi" />
                </div>
              </div>

              {/* Nút đổi điểm */}
              <button
                type="button"
                className="ld-swap-button"
                aria-label="Đổi điểm đi và điểm đến"
              >
                ⇄
              </button>

              {/* Điểm đến */}
              <div className="ld-search-field">
                <label>Điểm đến</label>

                <div className="ld-input-box">
                  <input type="text" placeholder="Chọn điểm đến" />
                </div>
              </div>

              {/* Ngày đi */}
              <div className="ld-search-field">
                <label>Ngày đi</label>

                <div className="ld-input-box">
                  <input type="date" />
                </div>
              </div>

              {/* Số vé */}
              <div className="ld-search-field">
                <label>Số vé</label>

                <div className="ld-input-box">
                  <select defaultValue="1">
                    <option value="1">1 vé</option>
                    <option value="2">2 vé</option>
                    <option value="3">3 vé</option>
                    <option value="4">4 vé</option>
                    <option value="5">5 vé</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ================= SEARCH BUTTON ================= */}
            <div className="ld-search-button-wrapper">
              <button type="button" className="ld-search-button">
                Tìm chuyến xe
              </button>
            </div>
          </div>
        </section>

        <div className="popularroute">
          <h1
            style={{
              color: "#004A99",
              fontSize: "32px",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            TUYẾN PHỔ BIẾN
          </h1>
          <div className="Detailedroutes">
            <div className="Detailedrouteswrapper">
              <img src="../../assets/images/b1.jpg" />
              <div className="Detailedroutescontent">
                <div className="Detailedroutescontenttitle">
                  <p>Tuyến xe từ Hồ Chí Minh</p>
                </div>
                <div className="Detailedroutescontentleftfirst">
                  <div className="Detailedroutescontentleftfirstcontent">
                    <p className="Drclfcontent">Đà Lạt</p>
                    <p className="Drclscontent">290.000đ</p>
                  </div>
                  <p className="DrclscontentFooter">310km - 480 giờ</p>
                </div>

                <div className="Detailedroutescontentleftcenter">
                  <div className="Detailedroutescontentleftfirstcontent">
                    <p className="Drclfcontent">Cần Thơ</p>
                    <p className="Drclscontent">165.000đ</p>
                  </div>
                  <p className="DrclscontentFooter">172km - 313 giờ</p>
                </div>

                <div className="Detailedroutescontentleftright">
                  <div className="Detailedroutescontentleftfirstcontent">
                    <p className="Drclfcontent">Long Xuyên</p>
                    <p className="Drclscontent">200.000đ</p>
                  </div>
                  <p className="DrclscontentFooter">209km - 267 giờ</p>
                </div>
              </div>
            </div>

            <div className="Detailedrouteswrapper">
              <img src="../../assets/images/b2.jpg" />
              <div className="Detailedroutescontent">
                <div className="Detailedroutescontenttitle">
                  <p>Tuyến xe từ Đà Lạt</p>
                </div>
                <div className="Detailedroutescontentleftfirst">
                  <div className="Detailedroutescontentleftfirstcontent">
                    <p className="Drclfcontent">Tp.Hồ Chí Minh</p>
                    <p className="Drclscontent">290.000đ</p>
                  </div>
                  <p className="DrclscontentFooter">305km - 480 giờ</p>
                </div>

                <div className="Detailedroutescontentleftcenter">
                  <div className="Detailedroutescontentleftfirstcontent">
                    <p className="Drclfcontent">Đà Nẵng</p>
                    <p className="Drclscontent">430.000đ</p>
                  </div>
                  <p className="DrclscontentFooter">700km - 840 giờ</p>
                </div>

                <div className="Detailedroutescontentleftright">
                  <div className="Detailedroutescontentleftfirstcontent">
                    <p className="Drclfcontent">Cần Thơ</p>
                    <p className="Drclscontent">445.000đ</p>
                  </div>
                  <p className="DrclscontentFooter">464km - 660 giờ</p>
                </div>
              </div>
            </div>

            <div className="Detailedrouteswrapper">
              <img src="../../assets/images/b3.jpg" />
              <div className="Detailedroutescontent">
                <div className="Detailedroutescontenttitle">
                  <p>Tuyến xe từ Đà Nẵng</p>
                </div>
                <div className="Detailedroutescontentleftfirst">
                  <div className="Detailedroutescontentleftfirstcontent">
                    <p className="Drclfcontent">Đà Lạt</p>
                    <p className="Drclscontent">290.000đ</p>
                  </div>
                  <p className="DrclscontentFooter">700km - 840 giờ</p>
                </div>

                <div className="Detailedroutescontentleftcenter">
                  <div className="Detailedroutescontentleftfirstcontent">
                    <p className="Drclfcontent">Tp.Hồ Chí Minh</p>
                    <p className="Drclscontent">430.000đ</p>
                  </div>
                  <p className="DrclscontentFooter">990km - 1200 giờ</p>
                </div>

                <div className="Detailedroutescontentleftright">
                  <div className="Detailedroutescontentleftfirstcontent">
                    <p className="Drclfcontent">Nha Trang</p>
                    <p className="Drclscontent">445.000đ</p>
                  </div>
                  <p className="DrclscontentFooter">550km - 600 giờ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------------------------------------------------------------------- */}
        {/* ================= THÀNH TỰU / GIỚI THIỆU ================= */}
        <section className="ld-achievements">
          <div className="ld-achievements-container">
            {/* TIÊU ĐỀ */}
            <div className="ld-achievements-heading">
              <span className="ld-achievements-label">
                HÀNH TRÌNH CỦA CHÚNG TÔI
              </span>

              <h2>
                KONOHA BUS - <span>CHẤT LƯỢNG LÀ DANH DỰ</span>
              </h2>

              <p>Đồng hành cùng bạn trên mọi nẻo đường</p>
            </div>

            <div className="ld-achievements-content">
              {/* ================= BÊN TRÁI ================= */}
              <div className="ld-achievements-list">
                {/* ITEM 1 */}
                <div className="ld-achievement-item">
                  <div className="ld-achievement-icon">
                    <span>👥</span>
                  </div>

                  <div className="ld-achievement-info">
                    <div className="ld-achievement-number">
                      Hơn 40 Triệu
                      <span>Lượt khách</span>
                    </div>

                    <p>
                      Konoha Bus phục vụ hơn 40 triệu lượt khách trên khắp các
                      tuyến đường mỗi năm.
                    </p>
                  </div>
                </div>

                {/* ITEM 2 */}
                <div className="ld-achievement-item">
                  <div className="ld-achievement-icon">
                    <span>📍</span>
                  </div>

                  <div className="ld-achievement-info">
                    <div className="ld-achievement-number">
                      Hơn 350
                      <span>Phòng vé - Bưu cục</span>
                    </div>

                    <p>
                      Hệ thống phòng vé và trạm trung chuyển rộng khắp, giúp
                      hành khách thuận tiện trong mọi hành trình.
                    </p>
                  </div>
                </div>

                {/* ITEM 3 */}
                <div className="ld-achievement-item">
                  <div className="ld-achievement-icon">
                    <span>🚌</span>
                  </div>

                  <div className="ld-achievement-info">
                    <div className="ld-achievement-number">
                      Hơn 6,500
                      <span>Chuyến xe</span>
                    </div>

                    <p>
                      Hàng nghìn chuyến xe đường dài được vận hành an toàn và
                      liên tục mỗi ngày.
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= BÊN PHẢI ================= */}
              <div className="ld-achievements-visual">
                <div className="ld-visual-circle ld-circle-1"></div>
                <div className="ld-visual-circle ld-circle-2"></div>

                <div className="ld-bus-card">
                  <div className="ld-bus-icon">🚌</div>

                  <div className="ld-bus-card-content">
                    <span>HÀNH TRÌNH AN TOÀN</span>

                    <h3>
                      Kết nối mọi
                      <br />
                      hành trình
                    </h3>

                    <p>An toàn • Tiện nghi • Tận tâm</p>
                  </div>
                </div>

                <div className="ld-floating-card ld-floating-card-1">
                  <span>✓</span>
                  <div>
                    <strong>An toàn</strong>
                    <p>Luôn là ưu tiên</p>
                  </div>
                </div>

                <div className="ld-floating-card ld-floating-card-2">
                  <span>★</span>
                  <div>
                    <strong>Chất lượng</strong>
                    <p>Dịch vụ tận tâm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="customertalkabout">
          <div className="customertalkabouttitle">
            <h1
              style={{
                color: "#004A99",
                fontSize: "32px",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Khách hàng nói gì về Konoha Bus
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#1A1A1A8C",
                textAlign: "center",
              }}
            >
              Những đánh giá tích cực của khách hàng là thước đo chất lượng của
              chúng tôi
            </p>
          </div>
          <div className="customertalkaboutcontentwapper">
            <div className="customertalkaboutcontent">
              <div className="customertalkaboutcontenttiitle">
                <p
                  style={{
                    fontSize: "18px",
                    color: "#004A99",
                    fontWeight: "500",
                  }}
                >
                  Konoha Bus là hãng xe lớn, có uy tín nên tôi hoàn toàn yên tâm
                  khi lựa chọn đặt vé cho bản thân và gia đình. Nhờ hiển thị rõ
                  nhà xe và vị trí chỗ trống trên xe, tôi rất dễ dàng tìm chuyến
                  mình muốn và chỗ mình muốn ngồi.
                </p>
              </div>
              <div className="customertalkaboutcontentcenter">
                <img src="../../assets/images/kh1.jpg" alt="Konoha Bus" />
                <div className="customertalkaboutcontentcenterwrapper">
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#004A99",
                      fontWeight: "600",
                    }}
                  >
                    Shark Phi
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#1A1A1A8C",
                    }}
                  >
                    Giám đốc BSSC
                  </p>
                </div>
              </div>
            </div>

            <div className="customertalkaboutcontent">
              <div className="customertalkaboutcontenttiitle">
                <p
                  style={{
                    fontSize: "18px",
                    color: "#004A99",
                    fontWeight: "500",
                  }}
                >
                  Konoha Bus là hãng xe lớn, có uy tín nên tôi hoàn toàn yên tâm
                  khi lựa chọn đặt vé cho bản thân và gia đình. Nhờ hiển thị rõ
                  nhà xe và vị trí chỗ trống trên xe, tôi rất dễ dàng tìm chuyến
                  mình muốn và chỗ mình muốn ngồi.
                </p>
              </div>
              <div className="customertalkaboutcontentcenter">
                <img src="../../assets/images/kh2.jpg" alt="Konoha Bus" />
                <div className="customertalkaboutcontentcenterwrapper">
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#004A99",
                      fontWeight: "600",
                    }}
                  >
                    Nguyễn Tuấn Quỳnh
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#1A1A1A8C",
                    }}
                  >
                    CEO Saigon Books
                  </p>
                </div>
              </div>
            </div>

            <div className="customertalkaboutcontent">
              <div className="customertalkaboutcontenttiitle">
                <p
                  style={{
                    fontSize: "18px",
                    color: "#004A99",
                    fontWeight: "500",
                  }}
                >
                  Konoha Bus là hãng xe lớn, có uy tín nên tôi hoàn toàn yên tâm
                  khi lựa chọn đặt vé cho bản thân và gia đình. Nhờ hiển thị rõ
                  nhà xe và vị trí chỗ trống trên xe, tôi rất dễ dàng tìm chuyến
                  mình muốn và chỗ mình muốn ngồi.
                </p>
              </div>
              <div className="customertalkaboutcontentcenter">
                <img src="../../assets/images/kh3.jpg" alt="Konoha Bus" />
                <div className="customertalkaboutcontentcenterwrapper">
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#004A99",
                      fontWeight: "600",
                    }}
                  >
                    Tú Ngô
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#1A1A1A8C",
                    }}
                  >
                    YOLA Co-Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="ld-footer">
        <div className="ld-footer-container">
          {/* ================= THƯƠNG HIỆU ================= */}
          <div className="ld-footer-brand">
            <div className="ld-footer-logo">
              <div className="ld-footer-logo-icon">KB</div>

              <span>Konoha Bus</span>
            </div>

            <p className="ld-footer-description">
              Đồng hành cùng bạn trên mọi hành trình. Đặt vé xe khách nhanh
              chóng, an toàn và tiện lợi.
            </p>

            {/* Mạng xã hội */}
            <div className="ld-footer-social">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="Youtube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* ================= LIÊN KẾT NHANH ================= */}
          <div className="ld-footer-column">
            <h3>Liên kết nhanh</h3>

            <Link href="/">Trang chủ</Link>

            <Link href="/bus-route">Lịch trình</Link>

            <Link href="/trips">Tra cứu vé</Link>

            <Link href="/news">Tin tức</Link>

            <Link href="/invoices">Hóa đơn</Link>
          </div>

          {/* ================= HỖ TRỢ ================= */}
          <div className="ld-footer-column">
            <h3>Hỗ trợ</h3>

            <Link href="/guide">Hướng dẫn đặt vé</Link>

            <Link href="/faq">Câu hỏi thường gặp</Link>

            <Link href="/contact">Liên hệ</Link>

            <Link href="/terms">Điều khoản sử dụng</Link>

            <Link href="/privacy">Chính sách bảo mật</Link>
          </div>

          {/* ================= THÔNG TIN LIÊN HỆ ================= */}
          <div className="ld-footer-column ld-footer-contact">
            <h3>Thông tin liên hệ</h3>

            <p>
              <span className="ld-contact-icon">☎</span>
              <span>1900 1234</span>
            </p>

            <p>
              <span className="ld-contact-icon">✉</span>
              <span>support@konohabus.vn</span>
            </p>

            <p>
              <span className="ld-contact-icon">●</span>
              <span>TP. Hồ Chí Minh, Việt Nam</span>
            </p>

            <p>
              <span className="ld-contact-icon">◷</span>
              <span>Hỗ trợ khách hàng 24/7</span>
            </p>
          </div>
        </div>

        {/* ================= FOOTER BOTTOM ================= */}
        <div className="ld-footer-bottom">
          <p>
            © 2026 <strong>Konoha Bus</strong>. All rights reserved.
          </p>

          <div className="ld-footer-bottom-links">
            <Link href="/terms">Điều khoản</Link>

            <span>•</span>

            <Link href="/privacy">Bảo mật</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
