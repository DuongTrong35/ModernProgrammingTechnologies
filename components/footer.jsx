import "./footer.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
export default function SiteFooter() {
  return (
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
  );
}