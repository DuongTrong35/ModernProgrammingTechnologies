"use client";
import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { FaCreditCard } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "./FindRide.css";
import HomeContainerLayout from "../../components/HomeContainerLayout";
import { useSearchParams } from "next/navigation";
import Tripdetail from "../../lib/tripdetail-route/Tripdetail";
import SeatData from "../../lib/tripdetail-route/SeatData";
import RouteData from "../../lib/tripdetail-route/RouteData";

function FindRide() {
  // const { state } = useLocation();
  // const id = state?.tripid;
  const searchParams = useSearchParams();
  const router = useRouter();
  const tripid = searchParams.get("tripid");
  const [tripDetail, setTripDetail] = useState(null);
  const pricetmp = tripDetail?.giave ?? 0;
  const [ghetren, setGheTren] = useState([]);
  const [gheduoi, setGheDuoi] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [soldSeats, setSoldSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [dsroute, setDsRoute] = useState([]);
  const dsroute = RouteData;
  const [showList, setShowList] = useState(false);
  const [showListBack, setShowListBack] = useState(false);
  const [SelectedValueected, setSelectedValue] = useState(null);
  const [SelectedValueectedBack, setSelectedValueectedBack] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });
  useEffect(() => {
    if (!tripid) return;

    const trip = Tripdetail.find((item) => item.tripid === tripid);

    setTripDetail(trip);
  }, [tripid]);

  //   useEffect(() => {
  //     setDsRoute(RouteData);
  // }, []);

  useEffect(() => {
    if (!tripDetail) return;

    setLoading(true);

    const seats = SeatData.filter((seat) => seat.busid === tripDetail.busid);

    setGheDuoi(seats.filter((seat) => seat.loai === 0));
    setGheTren(seats.filter((seat) => seat.loai === 1));

    setSoldSeats(
      seats.filter((seat) => seat.tinhtrang === 1).map((seat) => seat.id)
    );

    setLoading(false);
  }, [tripDetail]);

  const handleSelect = (seatCode) => {
    if (soldSeats.includes(seatCode)) return;
    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatCode));
    } else {
      setSelectedSeats([...selectedSeats, seatCode]);
    }
  };

  const renderSeats = (seats) =>
    seats.map((seat) => {
      const seatCode = seat.id;
      const isSold = soldSeats.includes(seatCode);
      const isSelected = selectedSeats.includes(seatCode);

      return (
        <div
          key={seatCode}
          className={`seat ${
            isSold ? "sold" : isSelected ? "selected" : "available"
          }`}
          onClick={() => handleSelect(seatCode)}
        >
          {seat.soghe + ""}
        </div>
      );
    });

  const givearrive = (e) => {
    const firstSpan = e.currentTarget.querySelector(
      ".HomeLeftCustomerCenterTimeItemCenter span:first-child"
    );
    if (!firstSpan) return;
    const fullText = firstSpan.textContent.trim();
    const value = fullText.split(" - ").slice(1).join(" - ");
    setSelectedValue(value);
    setShowList(false);
  };

  const giveback = (e) => {
    const firstSpan = e.currentTarget.querySelector(
      ".HomeLeftCustomerCenterTimeItemCenter1 span:first-child"
    );
    if (!firstSpan) return;
    const fullText = firstSpan.textContent.trim();
    const value = fullText.split(" - ").slice(1).join(" - ");
    setSelectedValueectedBack(value);
    setShowListBack(false);
  };
  const handlePayment = () => {
    const paymentData = {
      customer,

      departureInfo: {
        from: tripDetail?.benlen,
        to: tripDetail?.benxuong,

        route: `${tripDetail?.diemdi} → ${tripDetail?.diemden}`,

        departureTime: `${tripDetail?.giokhoihang} ${tripDetail?.ngaydi}`,

        seatCount: selectedSeats.length,

        seats: selectedSeats,

        pickupPoint: SelectedValueected || tripDetail?.benlen,

        dropPoint: SelectedValueectedBack || tripDetail?.benxuong,

        totalPrice: pricetmp * selectedSeats.length,
      },
    };

    sessionStorage.setItem("paymentData", JSON.stringify(paymentData));

    router.push("/pay-route");
  };
  const leftContent = (
    <>
      {loading ? (
        <p>Đang tải ghế...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="seat-container">
          <div className="header">
            <h4>Chọn ghế</h4>
            {/* <a href="#">Thông tin xe</a> */}
            {tripDetail?.loaixe}
          </div>

          <div className="seat-layout">
            <div className="floor">
              <h5>Tầng dưới</h5>
              <div className="seat-grid">{renderSeats(gheduoi)}</div>
            </div>

            <div className="floor">
              <h5>Tầng trên</h5>
              <div className="seat-grid">{renderSeats(ghetren)}</div>
            </div>
          </div>

          <div className="legend">
            <div>
              <span className="legend-box sold"></span> Đã bán
            </div>
            <div>
              <span className="legend-box available"></span> Còn trống
            </div>
            <div>
              <span className="legend-box selected"></span> Đang chọn
            </div>
          </div>
        </div>
      )}

      <div className="HomeLeftCustomer">
        <div className="HomeLeftCustomerCenter">
          <div className="HomeLeftCustomerLeft">
            <p
              style={{
                fontSize: "20px",
                fontWeight: 700,
                marginBottom: 0,
              }}
            >
              Thông tin khách hàng
            </p>
            <div className="HomeLeftCustomerLeftNamCustomer">
              <p>Nhập họ và tên</p>
              <span className="text-danger">*</span>
            </div>
            {/* <input
              type="text"
              style={{ width: "350px", padding: "8px 12px", backgroundColor:"antiquewhite" }}
            /> */}
            <input
              type="text"
              id="customerName"
              style={{ backgroundColor: "beige", width: "90%", height: "40px" }}
              name="customerName"
              value={customer.name}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  name: e.target.value,
                })
              }
            />
            <div className="HomeLeftCustomerLeftNamCustomer">
              <p>Số điện thoại</p>
              <span className="text-danger">*</span>
            </div>
            {/* <input
              type="text"
              style={{ width: "350px", padding: "8px 12px", backgroundColor:"antiquewhite" }}
            /> */}
            <input
              id="customerPhone"
              name="customerPhone"
              style={{ backgroundColor: "beige", width: "90%", height: "40px" }}
              type="text"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  phone: e.target.value,
                })
              }
            />
            <div className="HomeLeftCustomerLeftNamCustomer">
              <p>Email</p>
              <span className="text-danger">*</span>
            </div>
            {/* <input
              type="text"
              style={{ width: "350px", padding: "8px 12px", backgroundColor:"antiquewhite" }}
            /> */}
            <input
              id="customerEmail"
              name="customerEmail"
              style={{ backgroundColor: "beige", width: "90%", height: "40px" }}
              type="text"
              value={customer.email}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="HomeLeftCustomerRight">
            <p
              style={{
                fontSize: "20px",
                fontWeight: 400,
                color: "red",
                textAlign: "center",
              }}
            >
              ĐIỀU KHOẢN & LƯU Ý
            </p>

            <p
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "red",
              }}
            >
              Quý khách vui lòng Đăng ký/Đăng nhập tài khoản để nhận chương
              trình khuyến mãi.
            </p>

            <p style={{ fontSize: "15px", fontWeight: 500 }}>
              (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít
              nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán
              vé thành công có chứa mã vé được gửi từ hệ thống KONOHA BUS. Vui
              lòng liên hệ Trung tâm tổng đài{" "}
              <span style={{ fontWeight: 700, color: "red" }}>1900 6067</span>{" "}
              để được hỗ trợ.
            </p>

            <p style={{ fontSize: "15px", fontWeight: 500 }}>
              (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng
              đài trung chuyển{" "}
              <span style={{ fontWeight: 700, color: "red" }}>1900 6918</span>{" "}
              trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm
              xe trung chuyển không thể tới được.
            </p>

            <p style={{ fontSize: "15px", fontWeight: 500 }}>
              (*) Nếu quý khách có nhu cầu di chuyển chặng đường ngắn hơn so với
              hành trình, vui lòng gọi Tổng đài{" "}
              <span style={{ fontWeight: 700, color: "red" }}>1900 6067</span>{" "}
              để được hưởng chính sách giá vé tốt nhất.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
          }}
        >
          <input
            type="checkbox"
            style={{ width: "16px", height: "16px", marginRight: "8px" }}
          />
          <span>
            <a
              href="#"
              style={{
                textDecoration: "underline",
                color: "#f25c2a",
                fontWeight: 500,
                marginRight: "4px",
              }}
            >
              Chấp nhận điều khoản
            </a>
            đặt vé &amp; chính sách bảo mật thông tin của KONOHA BUS
          </span>
        </div>
      </div>

      <div className="HomeLeftCustomerCenterTime">
        <div
          className="HomeLeftCustomerCenterTimeBanner"
          style={{
            display: "flex",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: 700, marginBottom: "0" }}>
            Thông tin đón trả
          </p>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: "2px solid #f25c2a",
              color: "#f25c2a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: 1,
              marginLeft: "5px",
              marginTop: "5px",
            }}
          >
            i
          </div>
        </div>

        <div className="HomeLeftCustomerCenterTimeCenter">
          {showList && (
            <div className="HomeLeftCustomerCenterTimeCover">
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Nhập tên bến xe, văn phòng"
                />
              </div>
              {dsroute.length > 0 ? (
                dsroute
                  .filter((ar) => ar.tinhtrang === 0)
                  .map((ar, index) => (
                    <React.Fragment key={index}>
                      <div
                        className="HomeLeftCustomerCenterTimeItem"
                        onClick={(e) => givearrive(e)}
                      >
                        <div className="HomeLeftCustomerCenterTimeItemLeft">
                          <input type="radio" name="pickup" value="benxe" />
                        </div>
                        <div className="HomeLeftCustomerCenterTimeItemCenter">
                          <span>
                            {ar.gio} - {ar.ten}
                          </span>
                          <span>{ar.mota}</span>
                        </div>
                        <a
                          href={ar.link}
                          className="link-xemvitri"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Xem vị trí
                        </a>
                      </div>
                      <div className="custom-divider"></div>
                    </React.Fragment>
                  ))
              ) : (
                <div className="text-center">Không có dữ liệu nhân viên</div>
              )}
            </div>
          )}

          {showListBack && (
            <div className="HomeLeftCustomerCenterTimeCover1">
              <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Nhập tên bến xe, văn phòng"
                />
              </div>
              {dsroute.length > 0 ? (
                dsroute
                  .filter((ar) => ar.tinhtrang === 1)
                  .map((ar, index) => (
                    <React.Fragment key={index}>
                      <div
                        className="HomeLeftCustomerCenterTimeItem1"
                        onClick={(e) => giveback(e)}
                      >
                        <div className="HomeLeftCustomerCenterTimeItemLeft1">
                          <input type="radio" name="pickup" value="benxe" />
                        </div>
                        <div className="HomeLeftCustomerCenterTimeItemCenter1">
                          <span>
                            {ar.gio} - {ar.ten}
                          </span>
                          <span>{ar.mota}</span>
                        </div>
                        <a
                          href={ar.link}
                          className="link-xemvitri1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Xem vị trí
                        </a>
                      </div>
                      <div className="custom-divider"></div>
                    </React.Fragment>
                  ))
              ) : (
                <div className="text-center">Không có dữ liệu nhân viên</div>
              )}
            </div>
          )}

          <div className="HomeLeftCustomerCenterTimeCenterFrom">
            <p>ĐIỂM ĐÓN</p>
            <div className="HomeLeftCustomerCenterTimeCenterFromvp">
              <div className="HomeLeftCustomerCenterTimeCenterFromvpchose">
                <span className="label-text active">Bến xe/VP</span>
                <div className="input-arrow-wrapper">
                  <input
                    type="text"
                    placeholder="Đồng Đen"
                    className="input-with-arrow"
                    onClick={() => {
                      setShowList((prev) => !prev);
                      setShowListBack(false);
                    }}
                    value={SelectedValueected ?? ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "18px" }}>
              <div>
                <span>Quý khách vui lòng có mặt tại Bến xe/Văn Phòng</span>
              </div>
              {/* <div style={{ display: "flex", gap: "6px", fontWeight: 600 }}>
                <span>{tripDetail?.benlen}</span>{" "}
                <span style={{ color: "red" }}>
                  Trước {tripDetail?.giokhoihang} {tripDetail?.ngaydi}
                </span>
              </div> */}
              <div style={{ display: "flex", gap: "6px", fontWeight: 600 }}>
                <span>{SelectedValueected || "Chưa chọn"}</span>
                <span style={{ color: "red" }}>
                  Trước {tripDetail?.giokhoihang} {tripDetail?.ngaydi}
                </span>
              </div>
              <div>
                <span>
                  để được trung chuyển hoặc kiểm tra thông tin trước khi lên xe.
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "1px",
              height: "235px",
              backgroundColor: "#e5e5e5",
              margin: "0 8px",
            }}
          ></div>

          <div className="HomeLeftCustomerCenterTimeCenterTo">
            <p>ĐIỂM TRẢ</p>
            <div className="HomeLeftCustomerCenterTimeCenterFromvp">
              <div className="HomeLeftCustomerCenterTimeCenterFromvpchose">
                <span className="label-text active">Bến xe/VP</span>
                <div className="input-arrow-wrapper">
                  <input
                    type="text"
                    placeholder={tripDetail?.benxuong}
                    className="input-with-arrow"
                    onClick={() => {
                      setShowListBack((prev) => !prev);
                      setShowList(false);
                    }}
                    value={SelectedValueectedBack ?? ""}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="HomeLeftCustomerCenterBottom">
        <div className="flex flex-col gap-1">
          <div className="w-20 rounded-full bg-[#00613D] text-center text-xs text-white py-1">
            FUTAPAY
          </div>

          <div className="text-2xl font-medium text-black">
            {pricetmp * selectedSeats.length} đồng
          </div>
        </div>

        <div className="flex flex-auto items-center justify-end">
          {/* <button
  type="button"
  className="PaymentButton"
>
  <span>💳 Thanh toán</span>
</button> */}
          <button type="button" className="payment-btn" onClick={handlePayment}>
            <span className="payment-btn-text">💳 Thanh toán</span>
          </button>
        </div>
      </div>
    </>
  );

  const rightContent = (
    <>
      <div className="trip-info-card">
        <div className="trip-info-header">
          <span className="trip-icon">🚌</span>
          <h3>Thông tin lượt đi</h3>
        </div>

        <div className="trip-row">
          <span className="label">📍 Tuyến xe</span>
          <span className="value">
            {tripDetail?.diemdi} → {tripDetail?.diemden}
          </span>
        </div>

        <div className="trip-row">
          <span className="label">🕒 Xuất bến</span>
          <span className="value">
            {tripDetail?.giokhoihang} - {tripDetail?.ngaydi}
          </span>
        </div>

        <div className="trip-row">
          <span className="label">👥 Số lượng</span>
          <span className="value">{selectedSeats.length} Ghế</span>
        </div>

        <div className="trip-row">
          <span className="label">💺 Số ghế</span>
          <span className="value">
            {selectedSeats.length > 0
              ? selectedSeats.map((seat) => seat.slice(-2)).join(", ")
              : "Chưa chọn"}
          </span>
        </div>

        <div className="trip-total">
          <span>Tổng tiền</span>
          <strong>
            {(pricetmp * selectedSeats.length).toLocaleString("vi-VN")} đ
          </strong>
        </div>
      </div>

      <div className="HomeRightDeparturePrice">
        <div className="price-header">
          <div className="price-title">
            <span>💰 Chi tiết thanh toán</span>
          </div>

          <div className="price-info">i</div>
        </div>

        <div className="price-row">
          <span>Giá vé lượt đi</span>
          <span className="price-value">
            {(pricetmp * selectedSeats.length).toLocaleString()} đ
          </span>
        </div>

        <div className="price-row">
          <span>Phí thanh toán</span>
          <span className="free">Miễn phí</span>
        </div>

        <div className="customerline"></div>

        <div className="price-total">
          <div>
            <p>Tổng thanh toán</p>
            <small>Đã bao gồm toàn bộ chi phí</small>
          </div>

          <div className="total-price">
            {(pricetmp * selectedSeats.length).toLocaleString()} đ
          </div>
        </div>
      </div>
    </>
  );

  const footerContent = (
    <footer className="w3l-footer-29-main" style={{ background: "#FFEEEB" }}>
      <div className="footer-29 pt-5 pb-4">
        <div className="container pt-md-4">
          <div className="row footer-top-29">
            <div className="col-lg-4 col-md-6 footer-list-29">
              <h6 className="footer-title-29">Thông tin liên lạc</h6>
              <p className="mb-2 pe-xl-5">Địa chỉ: 130 Cô Bắc Q1 TPHCM</p>
              <p className="mb-2">Số điện thoại : (028)45.735.921</p>
              <p className="mb-2">Email : KonohaMarket@gmail.com</p>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-8 footer-list-29 mt-lg-0 mt-4 ps-lg-5">
              <h6 className="footer-title-29">Lời nhắn</h6>
              <p className="mt-3">
                Nếu cửa hàng chúng tôi làm gì sai thì mong quý khách thông cảm
              </p>
            </div>

            <div
              className="col-lg-2 col-md-3 col-6 ps-lg-5 ps-lg-4 footer-list-29 mt-md-0 mt-4"
              style={{ display: "flex", marginLeft: "80px" }}
            >
              <img
                src={null}
                alt=""
                style={{ width: "200px", height: "150px" }}
              />
              <img
                src={null}
                alt=""
                style={{ width: "95px", height: "79px", marginTop: "-28px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <HomeContainerLayout
      leftContent={leftContent}
      rightContent={rightContent}
      footerContent={footerContent}
    />
  );
}

export default FindRide;
