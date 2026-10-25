import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Trips.css";

// Định nghĩa kiểu dữ liệu cho một chuyến xe (Trip)
interface TripItem {
  busid: string;
  diemdi: string;
  diemden: string;
  giokhoihang: string;
  gioden: string;
  thoigian: number | string;
  giave: number;
}

// Định nghĩa kiểu dữ liệu cho state được truyền qua react-router-dom
interface LocationState {
  id?: string;
}

// 📌 FAKE DATABASE: Lưu trữ dữ liệu giả lập cho các tuyến xe theo route id
const fakeDatabase: Record<string, TripItem[]> = {
  "PTHCMX1": [
    {
      busid: "BUS_001",
      diemdi: "TP. Hồ Chí Minh",
      diemden: "Nha Trang",
      giokhoihang: "07:00",
      gioden: "15:00",
      thoigian: 8,
      giave: 350000,
    },
    {
      busid: "BUS_002",
      diemdi: "TP. Hồ Chí Minh",
      diemden: "Nha Trang",
      giokhoihang: "21:00",
      gioden: "05:00",
      thoigian: 8,
      giave: 400000,
    },
  ],
  "PTHCMX2": [
    {
      busid: "BUS_003",
      diemdi: "TP. Hồ Chí Minh",
      diemden: "Đà Lạt",
      giokhoihang: "06:30",
      gioden: "13:30",
      thoigian: 7,
      giave: 320000,
    },
    {
      busid: "BUS_004",
      diemdi: "TP. Hồ Chí Minh",
      diemden: "Đà Lạt",
      giokhoihang: "22:00",
      gioden: "05:00",
      thoigian: 7,
      giave: 380000,
    },
  ],
};

function Trips() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ép kiểu cho state lấy từ useLocation
  const state = location.state as LocationState;
  const id = state?.id || "PTHCMX1"; // Mặc định lấy PTHCMX1 nếu không truyền state để test dễ hơn
  
  console.log("Gửi qua:", id); // <-- kiểm tra lần 1

  const [dstrip, setdstrip] = useState<TripItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      setLoading(true);
      try {
        // 🔄 THAY THẾ AXIOS BẰNG FAKE DATABASE GỌI LẤY DỮ LIỆU
        // Giả lập độ trễ mạng nhẹ (500ms) cho giống gọi API thực tế
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Lấy dữ liệu từ fakeDatabase dựa vào id, nếu không có trả về mảng rỗng
        const resultData = fakeDatabase[id] || [
          {
            busid: "BUS_DEFAULT",
            diemdi: "TP. Hồ Chí Minh",
            diemden: "Đà Nẵng",
            giokhoihang: "08:00",
            gioden: "22:00",
            thoigian: 14,
            giave: 650000,
          }
        ];

        console.log("Kết quả Fake API:", resultData);
        setdstrip(resultData); // <-- PHẢI LÀ MẢNG
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrip();
    }
  }, [id]);

  return (
    <>
      <header className="ld-header">
        <div className="ld-header-inner">
          <Link to="/" className="ld-logo">
            <div className="ld-logo-square">LD</div>
            <div className="ld-logo-text">
              <div className="ld-logo-title">Long Distance Bus</div>
              <div className="ld-logo-subtitle">
                Cùng bạn trên mọi nẻo đường dài
              </div>
            </div>
          </Link>

          <nav className="ld-nav">
            <span className="ld-nav-link ld-nav-link--active">Trang chủ</span>
            <span className="ld-nav-link">Lịch trình</span>
            <span className="ld-nav-link">Tra cứu vé</span>
            <span className="ld-nav-link">Tin tức</span>
            <span className="ld-nav-link">Hóa đơn</span>
            <span className="ld-nav-link">Liên hệ</span>
            <span className="ld-nav-link">Về chúng tôi</span>
          </nav>

          <div className="ld-header-auth">
            <Link to="/login" className="ld-header-btn ld-header-btn--ghost">
              Đăng nhập
            </Link>
            <Link to="/register" className="ld-header-btn ld-header-btn--solid">
              Đăng ký
            </Link>
          </div>
        </div>
      </header>

      <main className="ld-main">
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
                <span className="ld-hero-pill-number">24</span>
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

      <div className="page">
        <div className="container">
          <h1 className="title">
            {dstrip[0]?.diemdi} - {dstrip[0]?.diemden} ({dstrip.length})
          </h1>

          {loading && <p style={{ textAlign: "center" }}>Đang tải dữ liệu chuyến đi...</p>}
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          {!loading && dstrip.length > 0 &&
            dstrip.map((trip, index) => (
              <div key={index} className="card">
                <div className="card-row">
                  <div>
                    <div className="subtext">{trip.giokhoihang}</div>
                    <div className="time">{trip.diemdi}</div>
                  </div>

                  <div className="center-info">
                    {trip.thoigian} giờ
                    <br /> (Asia/Ho Chi Minh)
                  </div>

                  <div>
                    <div className="subtext">{trip.gioden}</div>
                    <div className="time">{trip.diemden}</div>
                  </div>
                </div>

                <div className="tag-row">
                  <span>• Phương Trang</span>
                  <span>• {trip.thoigian} giờ chạy</span>
                </div>

                <div className="price-row">
                  <div className="price">
                    {trip?.giave?.toLocaleString() || ""} đ
                  </div>

                  <button
                    className="choose-btn"
                    onClick={() => navigate("/ride", { state: { busid: trip.busid } })}
                  >
                    Chọn chuyến
                  </button>
                </div>
              </div>
            ))}

          <div className="login-box">
            <h2 className="login-title">
              Đăng nhập ngay để nhận được nhiều quyền lợi dành cho thành viên
            </h2>
            <p className="login-text">
              Khi đăng nhập và tải App, bạn sẽ dễ dàng quản lý đặt chỗ, hoặc
              nhận thông tin khuyến mãi, và còn nhiều ưu đãi khác...
            </p>
            <button className="login-btn">Đăng nhập ngay</button>
          </div>
        </div>
      </div>

      <footer className="ld-footer">
        <div className="ld-footer-inner">
          <div className="ld-footer-col">
            <h4>Trung tâm tổng đài & CSKH</h4>
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

          <div className="ld-footer-col">
            <h4>Long Distance Bus</h4>
            <ul>
              <li>Về chúng tôi</li>
              <li>Lịch trình</li>
              <li>Tuyển dụng</li>
              <li>Tin tức & sự kiện</li>
            </ul>
          </div>

          <div className="ld-footer-col">
            <h4>Hỗ trợ</h4>
            <ul>
              <li>Tra cứu thông tin đặt vé</li>
              <li>Điều khoản sử dụng</li>
              <li>Câu hỏi thường gặp</li>
              <li>Hướng dẫn đặt vé trên web</li>
            </ul>
          </div>

          <div className="ld-footer-col">
            <h4>Tải app Long Distance Bus</h4>
            <div className="ld-footer-apps">
              <button className="ld-app-btn">CH Play</button>
              <button className="ld-app-btn">App Store</button>
            </div>
            <p className="ld-footer-text">Kết nối với chúng tôi</p>
            <div className="ld-footer-social">
              <span>𝕗</span>
              <span>▶</span>
              <span>📷</span>
            </div>
          </div>
        </div>

        <div className="ld-footer-bottom">
          © {new Date().getFullYear()} Long Distance Bus — Chất lượng là danh dự
        </div>
      </footer>
    </>
  );
}

export default Trips;