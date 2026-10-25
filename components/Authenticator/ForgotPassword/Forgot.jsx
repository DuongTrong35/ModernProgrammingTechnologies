"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Forgot.css";

export default function Forgot() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [autoFilled, setAutoFilled] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // =========================
  // VALIDATION
  // =========================

  const validatePhone = (value) => {
    return /^0\d{9}$/.test(value);
  };

  const validatePassword = (value) => {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      value
    );
  };

  // =========================
  // GỬI OTP - DEMO UI
  // =========================

  const handleRequestOtp = (e) => {
    e.preventDefault();

    setError(null);
    setSuccess("");

    if (!validatePhone(phone.trim())) {
      setError("Số điện thoại phải có 10 chữ số và bắt đầu bằng 0.");
      return;
    }

    setLoading(true);

    // Giả lập gọi API
    setTimeout(() => {
      setLoading(false);
      setSent(true);

      setSuccess("Mã OTP đã được gửi. Vui lòng kiểm tra điện thoại của bạn.");

      /*
       * DEMO:
       * Tạm tự điền OTP để test giao diện.
       *
       * Khi làm backend thật, bạn xóa đoạn này
       * và lấy OTP từ API.
       */
      setOtp("123456");
      setAutoFilled(true);
    }, 800);
  };

  // =========================
  // ĐẶT LẠI MẬT KHẨU - DEMO UI
  // =========================

  const handleResetPassword = (e) => {
    e.preventDefault();

    setError(null);
    setSuccess("");

    if (!otp.trim()) {
      setError("Vui lòng nhập mã OTP.");
      return;
    }

    if (otp.trim().length !== 6) {
      setError("Mã OTP phải có 6 chữ số.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError("Mật khẩu tối thiểu 8 ký tự, có chữ hoa và ký tự đặc biệt.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    setVerifying(true);

    // Giả lập xử lý backend
    setTimeout(() => {
      setVerifying(false);

      setSuccess("Đặt lại mật khẩu thành công!");

      // Chuyển về trang Login sau 1.5 giây
      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    }, 800);
  };

  return (
    <div className="auth-page">
      {/* ================= HEADER ================= */}
      <header className="auth-header">
        <div className="auth-brand">
          <div className="auth-logo-square">
            <Link href="/" className="auth-home">
              LD
            </Link>
          </div>

          <div>
            <div className="auth-brand-text-main">Long Distance Bus</div>

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

          <span className="auth-download-pill">Hỗ trợ 24/7</span>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="auth-main">
        {/* ================= LEFT ================= */}

        <section className="auth-hero">
          <div className="auth-hero-eyebrow">Long Distance Bus Lines</div>

          <h1 className="auth-hero-title">
            Quên mật khẩu? Đừng lo, có chúng tôi!
          </h1>

          <p className="auth-hero-sub">
            Chỉ cần nhập số điện thoại đã đăng ký, chúng tôi sẽ gửi mã xác thực
            để bạn đặt lại mật khẩu một cách nhanh chóng và an toàn.
          </p>

          <div className="auth-badge">
            <span role="img" aria-label="shield">
              🔐
            </span>
            Bảo mật tài khoản, an tâm mỗi chuyến đi
          </div>

          <ul className="auth-hero-list">
            <li>Gửi mã xác thực qua số điện thoại</li>
            <li>Hướng dẫn đặt lại mật khẩu từng bước</li>
            <li>Bảo mật thông tin khách hàng</li>
            <li>Hỗ trợ 24/7 khi có vấn đề</li>
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

        {/* ================= RIGHT ================= */}

        <section className="auth-card-wrapper">
          <div className="auth-card">
            <h2 className="auth-title">Quên mật khẩu</h2>

            <p className="auth-subtitle">
              Nhập số điện thoại đã đăng ký để nhận mã OTP và đặt lại mật khẩu.
            </p>

            {/* ================= STEP 1 ================= */}

            {!sent && (
              <form className="auth-form" onSubmit={handleRequestOtp}>
                <div>
                  <div className="auth-label">Số điện thoại</div>

                  <input
                    className="auth-input"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError(null);
                    }}
                    maxLength={10}
                    required
                  />
                </div>

                {error && <div className="auth-error">{error}</div>}

                {success && !error && (
                  <div className="auth-success">{success}</div>
                )}

                <button
                  type="submit"
                  disabled={loading || !phone.trim()}
                  className="auth-primary-btn"
                >
                  {loading ? "Đang gửi mã..." : "Gửi mã xác thực"}
                </button>
              </form>
            )}

            {/* ================= STEP 2 ================= */}

            {sent && (
              <form className="auth-form" onSubmit={handleResetPassword}>
                {/* OTP */}

                <div>
                  <div className="auth-label">Mã OTP</div>

                  <input
                    className="auth-input"
                    type="text"
                    inputMode="numeric"
                    placeholder="Nhập mã OTP"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

                      setOtp(value);
                      setError(null);
                    }}
                    maxLength={6}
                    required
                  />

                  {autoFilled && (
                    <div className="otp-hint">
                      Mã OTP đã được tự động điền. Vui lòng nhấn "Đặt lại mật
                      khẩu" để tiếp tục.
                    </div>
                  )}
                </div>

                {/* PASSWORD */}

                <div>
                  <div className="auth-label">Mật khẩu mới</div>

                  <div className="password-input-container">
                    <input
                      className="auth-input"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Ít nhất 8 ký tự, có chữ hoa & ký tự đặc biệt"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setError(null);
                      }}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      aria-label={
                        showNewPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                    >
                      {showNewPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}

                <div>
                  <div className="auth-label">Xác nhận mật khẩu mới</div>

                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="auth-input"
                      placeholder="Nhập lại mật khẩu mới"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError(null);
                      }}
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* ERROR / SUCCESS */}

                {error && <div className="auth-error">{error}</div>}

                {success && !error && (
                  <div className="auth-success">{success}</div>
                )}

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="auth-primary-btn"
                  disabled={verifying}
                >
                  {verifying ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
                </button>
              </form>
            )}

            {/* ================= BACK LOGIN ================= */}

            <div className="auth-bottom-text">
              <Link href="/authenticator/login-user" className="auth-link">
                ⟵ Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}