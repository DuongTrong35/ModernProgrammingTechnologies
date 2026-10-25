"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "./header.css";
import { usePathname } from "next/navigation";
export default function SiteHeader() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("currentUser");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);
  return (
    <>
      <header className="ld-header">
        <div className="ld-header-inner">
          {/* LOGO */}
          <Link href="/" className="ld-logo">
            <div className="ld-logo-square">KB</div>

            <div className="ld-logo-text">
              <div className="ld-logo-title">Konoha Bus</div>

              <div className="ld-logo-subtitle">
                Cùng bạn trên mọi nẻo đường dài
              </div>
            </div>
          </Link>

          {/* NAVIGATION */}
          <nav className="ld-nav">
            <Link
              href="/"
              className={`ld-nav-link ${
                pathname === "/" ? "ld-nav-link--active" : ""
              }`}
            >
              Trang chủ
            </Link>

            <Link
              href="/bus-route"
              className={`ld-nav-link ${
                pathname === "/bus-route" || pathname === "/trip-route"
                  ? "ld-nav-link--active"
                  : ""
              }`}
            >
              Lịch trình
            </Link>

            <Link href="/checkticket-route" className="ld-nav-link">
              Tra cứu vé
            </Link>

            <Link
              href="/new-route"
              className={`ld-nav-link ${
                pathname === "/news" ? "ld-nav-link--active" : ""
              }`}
            >
              Tin tức
            </Link>

            <Link href="/invoices" className="ld-nav-link">
              Hóa đơn
            </Link>

            <Link href="/contact" className="ld-nav-link">
              Liên hệ
            </Link>

            <Link href="/about" className="ld-nav-link">
              Về chúng tôi
            </Link>
          </nav>

          {/* AUTH */}
          <div className="ld-header-auth">
            {currentUser ? (
              <>
                <div
                  className="ld-user"
                  style={{ fontWeight: "600", fontSize: "20px" }}
                >
                  {currentUser.name}
                </div>

                <button
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("users");
                    localStorage.removeItem("role");
                    localStorage.removeItem("isLoggedIn");
                 

                    document.cookie = "loggedIn=; Max-Age=0; path=/";
                    location.reload();
                  }}
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/authenticator/login-user"
                  className="ld-header-btn ld-header-btn--ghost"
                >
                  Đăng nhập
                </Link>

                <Link
                  href="/components/Authenticator/Register"
                  className="ld-header-btn ld-header-btn--solid"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
