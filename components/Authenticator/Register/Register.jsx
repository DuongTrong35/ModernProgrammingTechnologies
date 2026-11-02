"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Register.css";

export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [err, setErr] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [autoFilled, setAutoFilled] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const validatePhone = (value) => {
    const regex = /^0\d{9}$/;
    return regex.test(value);
  };
  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(value);
  };
  const validateFullName = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return false;
    }
    const regex = /^(?!.*\d)[\p{L}\s]+$/u;
    return regex.test(trimmed);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    setSuccessMessage("");
    setLoading(true);
    if (!validateFullName(fullName)) {
      setErr("Họ tên không hợp lệ. Vui lòng chỉ nhập chữ.");
      setLoading(false);
      return;
    }
    if (!validatePhone(phone)) {
      setErr("Số điện thoại phải có 10 chữ số và bắt đầu bằng 0.");
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      setErr("Mật khẩu tối thiểu 8 ký tự, có chữ hoa và ký tự đặc biệt.");
      setLoading(false);
      return;
    }
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existed = users.find((u) => u.phone === phone);
      if (existed) {
        setErr("Số điện thoại đã được đăng ký.");
        setSuccessMessage("Xác thực thất bại !");
        setVerifying(false);
        return;
      }
      users.push({
        name: fullName,
        phone,
        password,
        role: "customer",
      });
      localStorage.setItem("users", JSON.stringify(users));
      setSuccessMessage("Xác thực thành công! Đang chuyển hướng...");
      setLoading(false);
      setTimeout(() => {
        router.push("/authenticator/login-user");
      }, 2000);
    }, 1000);
  };
  return (
    <div className="auth-page">
      {/* =========================
          HEADER
      ========================= */}

      <header className="auth-header">
        <div className="auth-brand">
          <div className="auth-logo-square">
            <Link href="/" className="auth-home">
              LD
            </Link>
          </div>

          <div>
            <div className="auth-brand-text-main">Konoha Bus</div>

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
              ↓
            </span>
            Tải ứng dụng
          </span>

          <span className="auth-download-pill">Hỗ trợ 24/7</span>
        </div>
      </header>

      {/* =========================
          MAIN
      ========================= */}

      <main className="auth-main">
        {/* =========================
            LEFT - HERO
        ========================= */}

        <section className="auth-hero">
          <div className="auth-hero-eyebrow">Konoha Bus</div>

          <h1 className="auth-hero-title">Cùng bạn trên mọi nẻo đường dài</h1>

          <p className="auth-hero-sub">
            Đặt vé xe liên tỉnh, xe trung chuyển đón – trả tận nơi, an toàn và
            tiện lợi. Chỉ vài bước là bạn đã sẵn sàng cho chuyến đi mới.
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

          {/* BUS ILLUSTRATION */}

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

        {/* =========================
            RIGHT - REGISTER CARD
        ========================= */}

        <section className="auth-card-wrapper">
          <div className="auth-card">
            {/* TABS */}

            <div className="auth-tabs">
              <Link href="/authenticator/login-user" className="auth-tab">
                Đăng nhập
              </Link>

              <button type="button" className="auth-tab auth-tab--active">
                Đăng ký
              </button>
            </div>

            <h2 className="auth-title">Đăng ký tài khoản mới</h2>

            <p className="auth-subtitle">
              Điền đầy đủ thông tin bên dưới để tạo tài khoản Konoha Bus.
            </p>

            {/* SUCCESS */}

            {successMessage && (
              <div className="auth-success-message">{successMessage}</div>
            )}

            {/* =========================
                STEP 1
            ========================= */}

            {!otpSent && (
              <form className="auth-form" onSubmit={onSubmit}>
                {/* FULL NAME */}

                <div>
                  <div className="auth-label">Họ và tên</div>

                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Nhập họ và tên"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                {/* PHONE */}

                <div>
                  <div className="auth-label">Số điện thoại</div>

                  <input
                    type="tel"
                    className="auth-input"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                    required
                  />
                </div>

                {/* PASSWORD */}

                <div>
                  <div className="auth-label">Mật khẩu</div>

                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="auth-input"
                      placeholder="Tạo mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* ERROR */}

                {err && <div className="auth-error">{err}</div>}

                {/* REGISTER BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="auth-primary-btn"
                >
                  {loading ? "Đang đăng ký..." : "Đăng ký"}
                </button>
              </form>
            )}

            {/* =========================
                STEP 2 - OTP
            ========================= */}

            {otpSent && (
              <form className="auth-form" onSubmit={handleOtpVerification}>
                <p>
                  Mã xác thực đã được gửi về số <strong>{phone}</strong>
                </p>

                <div>
                  <div className="auth-label">Nhập mã OTP</div>

                  <input
                    type="text"
                    inputMode="numeric"
                    className="auth-input"
                    placeholder="Nhập mã OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                    required
                    autoFocus
                  />

                  {autoFilled && (
                    <div className="otp-hint">
                      Mã OTP demo đã được tự động điền. Bạn có thể nhấn Tiếp tục
                      để xác nhận.
                    </div>
                  )}
                </div>

                {/* ERROR */}

                {err && <div className="auth-error">{err}</div>}

                {/* VERIFY BUTTON */}

                <button
                  type="submit"
                  className="auth-primary-btn"
                  disabled={verifying}
                >
                  {verifying ? "Đang xác thực..." : "Tiếp tục"}
                </button>
              </form>
            )}

            {/* =========================
                BOTTOM LOGIN
            ========================= */}

            {/* <div className="auth-bottom-text">

              Đã có tài khoản?{" "}

              <Link
                href="/login"
                className="auth-link"
              >
                Đăng nhập
              </Link>

            </div> */}

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
