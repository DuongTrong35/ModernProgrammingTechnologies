"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { Link, useNavigate, useParams,useLocation  } from "react-router-dom";
import fakeTripData from "../../lib/trip-route/Tripdata";
import axios from "axios";
import "./Trip.css";
import Header from "../header";
import Footer from "../footer";
import { useSearchParams } from "next/navigation";
function Trip() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const diemdi = searchParams.get("diemdi");
  const diemden = searchParams.get("diemden");
  // const navigate = useNavigate();
  //  const { state } = useLocation();
  // const id = state?.id;
  // console.log("Gửi qua:", id);

  // const { id } = useParams();
  // const id = "PTHCMX1";
  const [dstrip, setdstrip] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);

    const result = fakeTripData.filter(
      (trip) => trip.diemdi === diemdi && trip.diemden === diemden
    );

    setdstrip(result);
    setLoading(false);
  }, [diemdi, diemden]);
  // const [diadiem, setdiadiem] = useState({
  //   diemden: "",
  //   diemdi: "",
  // });
  return (
    <>
      <Header />

      <main className="ld-maintrip">
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
                {/* <span className="ld-hero-pill-number">{dscd.length}</span> */}
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
        <div className="containertrip">
          <h1 className="title">
            {dstrip[0]?.diemdi} - {dstrip[0]?.diemden} ({dstrip.length})
          </h1>

          {/* <div className="filters">
            <button className="filter-btn">Giá rẻ bất ngờ</button>
            <button className="filter-btn">Giờ khởi hành</button>
            <button className="filter-btn">Ghế trống</button>
          </div> */}

          {dstrip.length > 0 &&
            dstrip.map((trip, index) => (
              <div key={index} className="card">
                <div className="card-row">
                  <div>
                    <div className="subtext">{trip.giokhoihang}</div>
                    <div className="time">{trip.diemdi} </div>
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
                    {trip?.giave?.toLocaleString() || ""}
                  </div>

                  <button
                    className="choose-btn"
                    onClick={() => router.push(`/trip-detail?tripid=${trip.tripid}`)}
                  >
                    Chọn chuyến
                  </button>
                </div>
              </div>
            ))}

          {/* <div className="login-box">
            <h2 className="login-title">
              Đăng nhập ngay để nhận được nhiều quyền lợi dành cho thành viên
            </h2>
            <p className="login-text">
              Khi đăng nhập và tải App, bạn sẽ dễ dàng quản lý đặt chỗ, hoặc
              nhận thông tin khuyến mãi, và còn nhiều ưu đãi khác...
            </p>
            <button className="login-btn">Đăng nhập ngay</button>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Trip;
