"use client";
import { useEffect, useState } from "react";
import "./PaymentPage.css";
import { useRouter } from "next/navigation";
import Footer from "../footer";

import avavietqr from "../../public/assets/images/vietQR.png";
import avavnpay from "../../public/assets/images/VNPAY.png";

// import avavnpay from "../../assets/images/VNPAY.png";
import avazalopay from "../../public/assets/images/zalopay.svg";
import avashopee from "../../public/assets/images/shopee.png";
import avamomo from "../../public/assets/images/momo.svg";
import avavietel from "../../public/assets/images/viettelpay.svg";
import logoweb from "../../public/assets/images/konoha.png";
import qrviet from "../../public/assets/images/q2.jpg";
import qrzalo from "../../public/assets/images/q6.jpg";
import qrvnpay from "../../public/assets/images/q5.jpg";
import qrshopee from "../../public/assets/images/q4.jpg";
import qrmomo from "../../public/assets/images/q1.jpg";
import qrvittle from "../../public/assets/images/q3.jpg";

// Danh sách phương thức thanh toán
const methods = [
  {
    id: "vietqr",
    name: "Thanh toán VietQR",
    logo: "/assets/images/vietQR.png",
    qr: "/assets/images/q2.jpg",
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    logo: "/assets/images/zalopay.svg",
    qr: "/assets/images/q6.jpg",
        selected: true,

  },
  {
    id: "vnpay",
    name: "VNPay",
    logo: "/assets/images/VNPAY.png",
    qr: "/assets/images/q5.jpg",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    logo: "/assets/images/shopee.png",
    qr: "/assets/images/q4.jpg",
  },
  {
    id: "momo",
    name: "MoMo",
    logo: "/assets/images/momo.svg",
    qr: "/assets/images/q1.jpg",
  },
  {
    id: "viettel",
    name: "Viettel Money",
    logo: "/assets/images/viettelpay.svg",
    qr: "/assets/images/q3.jpg",
  },
];
const PaymentPage = () => {
  const router = useRouter();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [departureInfo, setDepartureInfo] = useState({
    from: "",
    to: "",
    departureTime: "",
    seatCount: 0,
    seats: [],
    pickupPoint: "",
    dropPoint: "",
    totalPrice: 0,
  });
  const [selectedMethod, setSelectedMethod] = useState(
    methods.find((m) => m.selected)
  );
  // TIMER — phải đặt trong component
  const [timeLeft, setTimeLeft] = useState(120); // 15 phút

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
  const total = 294000;
  const ticketPrice = 300000;
  const discount = 6000;

  useEffect(() => {
    const data = sessionStorage.getItem("paymentData");

    if (!data) {
      router.push("/");
      return;
    }

    const parsed = JSON.parse(data);

    setCustomer(parsed.customer);
    setDepartureInfo(parsed.departureInfo);
  }, []);
  return (
    <>
      <div className="header-wrapper">
        <div className="header-inner">
          <div className="header-left">
            <div className="lang">
              <span className="flag">🇻🇳</span>
              <span className="text">VI</span>
              <span className="arrow">▼</span>
            </div>

            <div className="app-download">
              <span className="icon">●</span>
              <span className="text">Tải ứng dụng</span>
              <span className="arrow">▼</span>
            </div>
          </div>
          <div className="header-center">
            {/* <img
              src="/assets/images/konoha.png"
              alt="konoha-logo"
              className="futa-logo"
            /> */}

            <div className="header-trip-info">
              <h2 className="route">{departureInfo.route}</h2>

              <p className="date">🕒 {departureInfo.departureTime}</p>

              <p className="trip-seat-info">
                💺 {departureInfo.seatCount} ghế
                {departureInfo.seats.length > 0 &&
                  ` • ${departureInfo.seats
                    .map((seat) => seat.slice(-2))
                    .join(", ")}`}
              </p>

              <p className="pickup-info">📍 {departureInfo.pickupPoint}</p>
            </div>
          </div>
          <div className="header-right">
            <div className="profile">
              <span className="avatar">👤</span>

              <div className="profile-info">
                <span className="name">{customer.name}</span>
                <small>{customer.phone}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pay-container">
        <div className="pay-left">
          <h3>Chọn phương thức thanh toán</h3>
          <ul className="pay-method-list">
            {methods.map((m) => (
              <li
                key={m.id}
                onClick={() => setSelectedMethod(m)}
                className={`pay-method-item ${
                  selectedMethod.id === m.id ? "pay-method-item--active" : ""
                }`}
              >
                {/* <input type="radio" name="method" defaultChecked={m.selected} /> */}
                <div className="pay-method-logo">
                  {/* <img src={m.logo} style={{ width: "100%" }} alt="" /> */}
                  <img
                    src={m.logo}
                    alt={m.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <div className="pay-method-text">
                  <div className="pay-method-name">{m.name}</div>
                  {m.id === "shopeepay" && (
                    <p className="pay-method-desc">
                      Giảm đến 20% tối đa 50k cho khách lần đầu thanh toán.
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="pay-center">
          <div className="pay-total">Tổng thanh toán</div>
          <div className="pay-total-amount">
            {departureInfo.totalPrice.toLocaleString("vi-VN")} đ{" "}
          </div>
          <div className="pay-qr-card">
            <div className="pay-qr-timer">
              Thời gian giữ chỗ còn lại {formatTime(timeLeft)}
            </div>
            <div className="pay-qr-box">
              {/* <img
                src={selectedMethod.qr}
                alt={selectedMethod.name}
                style={{ width: "230px" }}
              /> */}
              <img
                src={selectedMethod.qr}
                alt={selectedMethod.name}
                style={{ width: "230px", height: "230px" }}
              />
            </div>
            <div className="pay-qr-guide">
              <h4>Hướng dẫn thanh toán bằng {selectedMethod.name}</h4>
              <ol>
                <li>Mở ứng dụng {selectedMethod.name} trên điện thoại</li>
                <li>Dùng biểu tượng camera để quét mã QR</li>
                <li>Quét mã ở trang này và thanh toán</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="pay-right">
          <div className="pay-card">
            <h4>Thông tin hành khách</h4>
            <div className="pay-card-row">
              <span>Họ và tên</span>
              <span>{customer.name}</span>
            </div>
            <div className="pay-card-row">
              <span>Số điện thoại</span>
              <span>{customer.phone}</span>
            </div>
            <div className="pay-card-row">
              <span>Email</span>
              <span>{customer.email}</span>
            </div>
          </div>
          <div className="pay-card">
            <h4>Thông tin lượt đi</h4>
            <div className="pay-card-row">
              <span>Tuyến xe</span>
              <span>{departureInfo.route}</span>
            </div>
            <div className="pay-card-row">
              <span>Thời gian xuất bến</span>
              <span>{departureInfo.departureTime}</span>
            </div>
            <div className="pay-card-row">
              <span>Số lượng ghế</span>
              <span>{departureInfo.seatCount} ghế</span>
            </div>
            <div className="pay-card-row">
              <span>Số ghế</span>
              {/* <span> {departureInfo.seats.join(", ")}</span> */}
              <span>
                {departureInfo.seats.map((seat) => seat.slice(-2)).join(", ")}
              </span>
            </div>
            <div className="pay-card-row">
              <span>Điểm lên xe</span>
              <span> {departureInfo.pickupPoint}</span>
            </div>
            <div className="pay-card-row">
              <span>Điểm trả khách</span>
              <span>{departureInfo.dropPoint}</span>
            </div>
            <div className="pay-card-row">
              <span>Tổng tiền lượt đi</span>
              <span className="text-bold">{departureInfo.totalPrice}đ</span>
            </div>
          </div>
          <div className="pay-card">
            <h4>Chi tiết giá</h4>
            <div className="pay-card-row">
              <span>Giá vé lượt đi</span>
              <span>{departureInfo.totalPrice}đ</span>
            </div>
            <div className="pay-card-row">
              <span>Phí thanh toán</span>
              <span>0đ</span>
            </div>
            <hr />
            <div className="pay-card-row pay-card-row--total">
              <span>Tổng tiền</span>
              <span>
                {" "}
                {(departureInfo.totalPrice || 0).toLocaleString("vi-VN")} đ
              </span>
            </div>
          </div>
        </div>
      </div>
            <Footer />
      
    </>
  );
};
export default PaymentPage;
