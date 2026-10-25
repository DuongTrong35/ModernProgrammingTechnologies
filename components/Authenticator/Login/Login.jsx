"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SAMPLE_USERS } from "../../../lib/users";
import "./Login.css";

export default function Login() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // =====================================================
  // ĐỌC DANH SÁCH TÀI KHOẢN TỪ LOCAL STORAGE
  // =====================================================
  const getRegisteredUsers = () => {
    const storedUsers = localStorage.getItem("users");

    if (!storedUsers) {
      return [];
    }

    const parsedUsers = JSON.parse(storedUsers);

    if (!Array.isArray(parsedUsers)) {
      throw new Error("Dữ liệu tài khoản không hợp lệ.");
    }

    return parsedUsers;
  };

  // =====================================================
  // XỬ LÝ ĐĂNG NHẬP
  // =====================================================
  const onSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    setSuccessMessage("");
    const normalizedPhone = phone.trim();
    //Kiểm tra dữ liệu đầu vào
    if (!normalizedPhone || !password) {
      setErr("Vui lòng nhập đầy đủ số điện thoại và mật khẩu.");
      return;
    }
    setBusy(true);
    try {
      // Đọc tài khoản đã đăng ký từ localStorage
      const registeredUsers = getRegisteredUsers();
      // Kết hợp Mock Data và tài khoản đã đăng ký
      const allUsers = [
        ...SAMPLE_USERS,
        ...registeredUsers,
      ];

      // 4. Kiểm tra tài khoản
      const matchedUser = allUsers.find(
        (user) =>
          String(user.phone).trim() === normalizedPhone &&
          String(user.password) === password
      );

      // 5. Sai tài khoản hoặc mật khẩu
      if (!matchedUser) {
        setErr("Số điện thoại hoặc mật khẩu không chính xác.");
        return;
      }

      // =================================================
      // ĐĂNG NHẬP THÀNH CÔNG
      // =================================================

      // 6. Tạo thông tin người dùng hiện tại
      // Không lưu password
      const currentUser = {
        phone: matchedUser.phone,
        name: matchedUser.name ?? "",
        email: matchedUser.email ?? "",
          role: matchedUser.role ?? "customer",

      };

      // 7. Lưu thông tin người dùng vào localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );

      // 8. Lưu trạng thái đăng nhập phía Client
      localStorage.setItem("isLoggedIn", "true");

      // =================================================
      // 9. TẠO COOKIE CHO MIDDLEWARE
      // =================================================
      document.cookie =
        "loggedIn=true; path=/; max-age=86400; SameSite=Lax";

      // 10. Hiển thị thông báo thành công
      setSuccessMessage(
        "Đăng nhập thành công! Đang chuyển hướng..."
      );

      // 11. Chuyển về trang chủ

      setTimeout(() => {
  if (matchedUser.role === "admin") {
    router.push("/manager");
  }else {
    router.push("/");
  }

  router.refresh();
}, 700);
    } catch (error) {
      console.error("Login error:", error);

      setErr(
        "Không thể đọc dữ liệu tài khoản. Vui lòng kiểm tra lại."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      {/* ================= HEADER ================= */}
      <header className="auth-header">
        <div className="auth-brand">
          <div className="auth-logo-square">
            <Link href="/" className="auth-home">
              KB
            </Link>
          </div>

          <div>
            <div className="auth-brand-text-main">
              Konoha Bus
            </div>

            <div className="auth-brand-text-sub">
              Cùng bạn trên mọi nẻo đường
            </div>
          </div>
        </div>

        <div className="auth-header-right">
          <span className="auth-header-link">
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
              }}
            >
              ⬇
            </span>
            Tải ứng dụng
          </span>

          <span className="auth-download-pill">
            Hỗ trợ 24/7
          </span>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="auth-main">
        {/* ================= BÊN TRÁI ================= */}
        <section className="auth-hero">
          <div className="auth-hero-eyebrow">
            Konoha Bus
          </div>

          <h1 className="auth-hero-title">
            Cùng bạn trên mọi nẻo đường dài
          </h1>

          <p className="auth-hero-sub">
            Đặt vé xe liên tỉnh, xe trung chuyển đón – trả tận
            nơi, an toàn và tiện lợi. Chỉ vài bước là bạn đã
            sẵn sàng cho chuyến đi mới.
          </p>

          <div className="auth-badge">
            <span role="img" aria-label="bus">
              🚌
            </span>
            Xe trung chuyển đón – trả tận nơi
          </div>

          <ul className="auth-hero-list">
            <li>Đặt vé trực tuyến nhanh chóng</li>
            <li>Hỗ trợ khách hàng 24/7</li>
            <li>Thông tin lịch trình minh bạch</li>
            <li>Thanh toán linh hoạt, an toàn</li>
          </ul>

          {/* ================= BUS ILLUSTRATION ================= */}
          <div className="auth-bus-illustration">
            <div className="auth-bus-road" />

            <div className="auth-bus-body">
              <div className="auth-bus-window-row">
                <div className="auth-bus-window" />
                <div className="auth-bus-window" />
                <div className="auth-bus-window" />
              </div>

              <div className="auth-bus-door" />

              <div className="auth-bus-front" />

              <div className="auth-bus-wheel left" />
              <div className="auth-bus-wheel right" />
            </div>
          </div>
        </section>

        {/* ================= BÊN PHẢI ================= */}
        <section className="auth-card-wrapper">
          <div className="auth-card">
            {/* ================= TAB ================= */}
            <div className="auth-tabs">
              <button
                type="button"
                className="auth-tab auth-tab--active"
              >
                Đăng nhập
              </button>

              <Link
                href="/authenticator/register-user"
                className="auth-tab"
              >
                Đăng ký
              </Link>
            </div>

            {/* ================= TITLE ================= */}
            <h2 className="auth-title">
              Đăng nhập tài khoản
            </h2>

            <p className="auth-subtitle">
              Nhập số điện thoại và mật khẩu để tiếp tục đặt vé.
            </p>

            {/* ================= SUCCESS ================= */}
            {successMessage && (
              <div
                className="auth-success-message"
                role="status"
                aria-live="polite"
              >
                {successMessage}
              </div>
            )}

            {/* ================= FORM ================= */}
            <form className="auth-form" onSubmit={onSubmit}>
              {/* ================= PHONE ================= */}
              <div>
                <label
                  className="auth-label"
                  htmlFor="login-phone"
                >
                  Số điện thoại
                </label>

                <input
                  id="login-phone"
                  className="auth-input"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErr(null);
                    setSuccessMessage("");
                  }}
                  required
                />
              </div>

              {/* ================= PASSWORD ================= */}
              <div>
                <label
                  className="auth-label"
                  htmlFor="login-password"
                >
                  Mật khẩu
                </label>

                <div className="password-input-container">
                  <input
                    id="login-password"
                    className="auth-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErr(null);
                      setSuccessMessage("");
                    }}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Ẩn mật khẩu"
                        : "Hiện mật khẩu"
                    }
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* ================= ERROR ================= */}
              {err && (
                <div
                  className="auth-error"
                  role="alert"
                  aria-live="assertive"
                >
                  {err}
                </div>
              )}

              {/* ================= LOGIN BUTTON ================= */}
              <button
                type="submit"
                disabled={busy}
                className="auth-primary-btn"
              >
                {busy ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>

              {/* ================= FORGOT PASSWORD ================= */}
              <div className="auth-forgot-row">
                <Link
                  href="/authenticator/forgot-user"
                  className="auth-link"
                  style={{ cursor: "pointer" }}
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </form>

            {/* ================= BACK ================= */}
            <div className="auth-bottom-text">
              <Link href="/" className="auth-back-btn">
                Quay lại
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}