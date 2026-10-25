"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bus,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileText,
  LayoutDashboard,
  MapPinned,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Ticket,
  Users,
  X,
} from "lucide-react";
// import SeatLayoutEditor from "@/components/seat-layout-editor";
import SeatLayoutEditor from "../components/seat-layout-editor";

const sectionLabels = {
  overview: "Tổng quan",
  routes: "Tuyến đường",
  trips: "Lịch chạy",
  fleet: "Đội xe",
  profile: "Thông tin nhà xe",
};
const navItems = [
  { id: "overview", icon: LayoutDashboard },
  { id: "routes", icon: MapPinned },
  { id: "trips", icon: CalendarDays },
  { id: "fleet", icon: Bus },
  { id: "profile", icon: Settings2 },
];
const formatMoney = (amount) =>
  new Intl.NumberFormat("vi-VN").format(amount) + "đ";
const sectionPaths = {
  overview: "/manager",
  routes: "/manager/routes",
  trips: "/manager/routes?view=trips",
  fleet: "/manager/fleet",
  profile: "/manager/profile",
};

export default function FleetDashboard({
  initialData,
  initialSection = "overview",
}) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem("currentUser");

    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);
  const [section, setSection] = useState(initialSection);
  const [routes, setRoutes] = useState(initialData.routes);
  const [trips, setTrips] = useState(initialData.trips);
  const [buses, setBuses] = useState(initialData.buses);
  const [operator, setOperator] = useState(initialData.operator);
  const [query, setQuery] = useState("");
  const [tripFilter, setTripFilter] = useState("Tất cả trạng thái");
  const [createKind, setCreateKind] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState("");
  const visibleTrips = useMemo(
    () =>
      trips.filter((trip) => {
        const matchesQuery =
          `${trip.route} ${trip.bus} ${trip.plate} ${trip.id}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return (
          matchesQuery &&
          (tripFilter === "Tất cả trạng thái" || trip.status === tripFilter)
        );
      }),
    [query, tripFilter, trips]
  );
  const title = sectionLabels[section];
  function navigateSection(nextSection) {
    setSection(nextSection);
    setMobileNavOpen(false);
    setQuery("");
    router.push(sectionPaths[nextSection]);
  }
  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }
  async function saveNewRecord(event) {
    event.preventDefault();
    if (!createKind) return;
    const values = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    );
    const endpoint =
      createKind === "bus" ? "/api/manager/fleet" : "/api/manager/routes";
    const payload =
      createKind === "route"
        ? {
            ...values,
            distance: Number(values.distance),
            fare: Number(values.fare),
            departures: ["08:00"],
          }
        : createKind === "bus"
        ? { ...values, seats: Number(values.seats) }
        : { ...values, kind: "trip", capacity: Number(values.capacity) };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            Object.values(result.errors || {})[0] ||
            "Không thể tạo dữ liệu."
        );

      if (createKind === "route") {
        setRoutes((current) => [...current, result.data]);
        navigateSection("routes");
      } else if (createKind === "bus") {
        setBuses((current) => [...current, result.data]);
        navigateSection("fleet");
      } else {
        setTrips((current) => [...current, result.data]);
        navigateSection("trips");
      }
      setCreateKind(null);
      showToast("Đã tạo dữ liệu nhà xe.");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Không thể tạo dữ liệu."
      );
    }
  }

  async function saveOperator(event) {
    event.preventDefault();
    const values = Object.fromEntries(
      new FormData(event.currentTarget).entries()
    );
    try {
      const response = await fetch("/api/manager/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error ||
            Object.values(result.errors || {})[0] ||
            "Không thể cập nhật hồ sơ."
        );
      setOperator(result.data);
      showToast("Đã cập nhật thông tin nhà xe.");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Không thể cập nhật hồ sơ."
      );
    }
  }

  async function changeTripStatus(tripId, status) {
    try {
      const response = await fetch("/api/manager/routes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "trip", id: tripId, status }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Không thể cập nhật trạng thái.");
      setTrips((current) =>
        current.map((trip) => (trip.id === tripId ? result.data : trip))
      );
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Không thể cập nhật trạng thái."
      );
    }
  }
  return (
    <div className="app-shell min-h-screen">
      <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark">
            <Bus size={21} strokeWidth={2.4} />
          </div>
          <div>
            <strong>TAYDO</strong>
            <span>BUS LINES</span>
          </div>
          <button
            className="sidebar-close icon-button"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Đóng menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="workspace-switcher">
          <div className="workspace-avatar">TD</div>
          <div className="workspace-copy">
            <strong>TAYDO Bus Lines</strong>
            <span>Nhà xe đối tác</span>
          </div>
          <ChevronDown size={15} />
        </div>

        <p className="nav-caption">VẬN HÀNH</p>
        <nav className="main-nav" aria-label="Điều hướng chính">
          {navItems.map(({ id, icon: Icon }) => (
            <button
              aria-label={sectionLabels[id]}
              className={`nav-link ${section === id ? "nav-link-active" : ""}`}
              key={id}
              onClick={() => navigateSection(id)}
              title={sectionLabels[id]}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{sectionLabels[id]}</span>
              {id === "trips" && <span className="nav-count">12</span>}
            </button>
          ))}
        </nav>

        <p className="nav-caption nav-caption-spaced">QUẢN TRỊ</p>
        <button
          className="nav-link"
          onClick={() =>
            showToast("Báo cáo doanh thu sẽ được kết nối với dữ liệu thật.")
          }
        >
          <FileText size={18} strokeWidth={1.8} />
          <span>Báo cáo doanh thu</span>
        </button>
        <button
          className="nav-link"
          onClick={() => showToast("Trung tâm hỗ trợ đang sẵn sàng.")}
        >
          <CircleHelp size={18} strokeWidth={1.8} />
          <span>Trung tâm hỗ trợ</span>
        </button>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">
              <ShieldCheck size={17} />
            </div>
            <strong>Đối tác xác thực</strong>
            <p>Hồ sơ nhà xe đã được xác minh.</p>
            <span>
              <i /> Đang hoạt động
            </span>
          </div>
          <button
            className="user-profile"
            onClick={() => navigateSection("profile")}
          >
            <div className="user-avatar">MA</div>
            <div>
              <strong>{currentUser?.name || "Minh Anh"}</strong>{" "}
              {/* <span>Quản trị viên</span> */}
              <span>
                {currentUser?.role === "admin"
                  ? "Quản trị viên"
                  : currentUser?.role === "staff"
                  ? "Nhân viên"
                  : "Khách hàng"}
              </span>
            </div>
            <MoreHorizontal size={18} />
          </button>
        </div>
      </aside>

      {mobileNavOpen && (
        <button
          className="mobile-scrim"
          onClick={() => setMobileNavOpen(false)}
          aria-label="Đóng menu"
        />
      )}

      <main className="main-area min-h-screen">
        <header className="topbar">
          <button
            className="menu-toggle icon-button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Mở menu"
          >
            <Menu size={20} />
          </button>
          <div className="breadcrumbs">
            <span>Quản lý nhà xe</span>
            <span>/</span>
            <strong>{title}</strong>
          </div>
          <div className="topbar-actions">
            <label className="global-search">
              <Search size={17} />
              <input
                aria-label="Tìm kiếm"
                placeholder="Tìm tuyến, chuyến, xe..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <kbd>⌘ K</kbd>
            </label>
            <button className="date-pill">
              <CalendarDays size={16} />
              <span>Hôm nay, 10 thg 10</span>
              <ChevronDown size={14} />
            </button>
            <button
              className="help-button"
              aria-label="Hướng dẫn"
              onClick={() =>
                showToast("Tài liệu vận hành sẽ sớm có mặt tại đây.")
              }
            >
              <CircleHelp size={18} />
            </button>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div>
              <span className="eyebrow">THỨ BẢY, 10 THÁNG 10, 2026</span>
              <h1>
                {section === "overview"
                  ? `Chào buổi sáng, ${currentUser?.name || "Minh Anh"}`
                  : title}
              </h1>
              <p>
                {section === "overview"
                  ? "Tổng quan hoạt động và lịch khởi hành trong ngày."
                  : sectionDescription(section)}
              </p>
            </div>
            <div className="heading-actions">
              {section !== "profile" && (
                <button
                  className="button button-secondary"
                  onClick={() => showToast("Đã xuất báo cáo mẫu.")}
                >
                  <ArrowDownRight size={16} /> Xuất báo cáo
                </button>
              )}
              {section !== "profile" && (
                <button
                  className="button button-primary"
                  onClick={() =>
                    setCreateKind(
                      section === "routes"
                        ? "route"
                        : section === "fleet"
                        ? "bus"
                        : "trip"
                    )
                  }
                >
                  <Plus size={17} />
                  {section === "routes"
                    ? "Thêm tuyến"
                    : section === "fleet"
                    ? "Thêm xe"
                    : "Tạo chuyến"}
                </button>
              )}
            </div>
          </div>

          {section === "overview" && (
            <Overview
              routes={routes}
              trips={visibleTrips}
              buses={buses}
              onGo={navigateSection}
            />
          )}
          {section === "routes" && (
            <RoutesView
              routes={routes}
              query={query}
              onCreate={() => setCreateKind("route")}
            />
          )}
          {section === "trips" && (
            <TripsView
              trips={visibleTrips}
              filter={tripFilter}
              onFilter={setTripFilter}
              onCreate={() => setCreateKind("trip")}
              onStatusChange={changeTripStatus}
            />
          )}
          {section === "fleet" && (
            <FleetView buses={buses} onCreate={() => setCreateKind("bus")} />
          )}
          {section === "profile" && (
            <ProfileView operator={operator} onSave={saveOperator} />
          )}

          <footer className="page-footer">
            <span>© 2026 TAYDO Bus Lines</span>
            <span>
              <i className="live-dot" /> Hệ thống đang hoạt động ổn định
            </span>
            <button onClick={() => showToast("Phiên bản giao diện 1.0.0")}>
              Phiên bản 1.0.0
            </button>
          </footer>
        </div>
      </main>

      {createKind && (
        <CreateDialog
          kind={createKind}
          routes={routes}
          onClose={() => setCreateKind(null)}
          onSubmit={saveNewRecord}
        />
      )}
      {toast && (
        <div className="toast-message" role="status">
          <Check size={17} />
          {toast}
          <button onClick={() => setToast("")} aria-label="Đóng thông báo">
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
function sectionDescription(section) {
  return {
    overview: "Tổng quan hoạt động và lịch khởi hành trong ngày.",
    routes: "Thiết lập hành trình, giá vé và giờ xuất bến cố định.",
    trips: "Theo dõi lịch khởi hành và tình hình chỗ bán theo ngày.",
    fleet: "Phương tiện, tài xế và sơ đồ ghế trên từng xe.",
    profile: "Thông tin liên hệ, chính sách và hồ sơ nhà xe.",
  }[section];
}
function Overview({ routes, trips, buses, onGo }) {
  const departureCount = trips.filter(
    (trip) => trip.status !== "Đã hủy" && trip.status !== "Đã khởi hành"
  ).length;
  const soldCount = trips.reduce((total, trip) => total + trip.sold, 0);
  const capacity = trips.reduce((total, trip) => total + trip.capacity, 0);
  return (
    <>
      <section className="welcome-banner">
        <div className="welcome-orbit orbit-one" />
        <div className="welcome-orbit orbit-two" />
        <div className="welcome-copy">
          <span>ĐIỀU HÀNH HÔM NAY</span>
          <h2>Mọi hành trình đều bắt đầu từ đây.</h2>
          <p>
            {departureCount} chuyến sắp khởi hành · {routes.length} tuyến đang
            khai thác
          </p>
        </div>
        <div className="banner-art" aria-hidden="true">
          <div className="sun-disc" />
          <div className="road-line" />
          <div className="bus-illustration">
            <Bus size={58} strokeWidth={1.25} />
          </div>
          <div className="banner-hill hill-back" />
          <div className="banner-hill hill-front" />
        </div>
        <button className="banner-link" onClick={() => onGo("trips")}>
          Mở lịch chạy <ArrowRight size={16} />
        </button>
      </section>

      <section className="metric-grid" aria-label="Chỉ số vận hành">
        <MetricCard
          label="Chuyến hôm nay"
          value={String(departureCount).padStart(2, "0")}
          detail="Đang mở bán hoặc sắp chạy"
          icon={<Bus size={18} />}
          trend="12%"
          positive
        />
        <MetricCard
          label="Vé đã bán"
          value={String(soldCount)}
          detail={`Trên tổng ${capacity} chỗ trong ngày`}
          icon={<Ticket size={18} />}
          trend="8,4%"
          positive
        />
        <MetricCard
          label="Tỷ lệ lấp đầy"
          value={`${Math.round((soldCount / Math.max(capacity, 1)) * 100)}%`}
          detail="So với sức chứa chuyến"
          icon={<Users size={18} />}
          trend="3,2%"
          positive={false}
        />
        <MetricCard
          label="Đội xe hoạt động"
          value={`${
            buses.filter((bus) => bus.status === "Đang hoạt động").length
          }/${buses.length}`}
          detail="Phương tiện sẵn sàng khai thác"
          icon={<Activity size={18} />}
          trend="Ổn định"
          positive
        />
      </section>

      <div className="overview-grid">
        <section className="panel departures-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">CẬP NHẬT THEO THỜI GIAN THỰC</span>
              <h2>Lịch khởi hành hôm nay</h2>
            </div>
            <button className="text-button" onClick={() => onGo("trips")}>
              Tất cả chuyến <ArrowRight size={15} />
            </button>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>GIỜ ĐI</th>
                  <th>TUYẾN ĐƯỜNG</th>
                  <th>PHƯƠNG TIỆN</th>
                  <th>CHỖ ĐÃ BÁN</th>
                  <th>TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody>
                {trips.slice(0, 4).map((trip) => (
                  <TripRow key={trip.id} trip={trip} />
                ))}
              </tbody>
            </table>
          </div>
          <button className="mobile-table-link" onClick={() => onGo("trips")}>
            Xem toàn bộ lịch chạy <ArrowRight size={15} />
          </button>
        </section>

        <section className="panel route-summary-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">MẠNG LƯỚI CỦA BẠN</span>
              <h2>Tuyến nổi bật</h2>
            </div>
            <button className="icon-button" aria-label="Tùy chọn tuyến">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="route-summary-list">
            {routes.slice(0, 3).map((route, index) => (
              <div className="route-summary" key={route.id}>
                <span className={`route-rank route-rank-${index + 1}`}>
                  0{index + 1}
                </span>
                <div className="route-summary-copy">
                  <strong>{route.origin}</strong>
                  <span>
                    <i /> {route.destination}
                  </span>
                </div>
                <div className="route-summary-meta">
                  <strong>{formatMoney(route.fare)}</strong>
                  <span>{route.departures.length} chuyến/ngày</span>
                </div>
              </div>
            ))}
          </div>
          <button className="panel-bottom-link" onClick={() => onGo("routes")}>
            Quản lý tuyến đường <ArrowRight size={15} />
          </button>
        </section>
      </div>
    </>
  );
}
function MetricCard({ label, value, detail, icon, trend, positive }) {
  return (
    <article className="metric-card">
      <div className="metric-card-top">
        <span>{label}</span>
        <span className="metric-icon">{icon}</span>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">
        <span>{detail}</span>
        <span
          className={`metric-trend ${positive ? "trend-up" : "trend-down"}`}
        >
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {trend}
        </span>
      </div>
      <div className="metric-rule">
        <i />
      </div>
    </article>
  );
}
function TripRow({ trip }) {
  return (
    <tr>
      <td>
        <strong className="departure-time">{trip.departure}</strong>
        <span className="table-sub">10/10/2026</span>
      </td>
      <td>
        <strong>{trip.route.split(" → ")[0]}</strong>
        <span className="table-sub route-destination">
          <i />
          {trip.route.split(" → ")[1]}
        </span>
      </td>
      <td>
        <strong>{trip.bus}</strong>
        <span className="table-sub">{trip.plate}</span>
      </td>
      <td>
        <div className="seat-progress">
          <span>
            <strong>{trip.sold}</strong> / {trip.capacity}
          </span>
          <i>
            <b style={{ width: `${(trip.sold / trip.capacity) * 100}%` }} />
          </i>
        </div>
      </td>
      <td>
        <StatusBadge status={trip.status} />
      </td>
    </tr>
  );
}
function StatusBadge({ status }) {
  const className =
    status === "Đang mở bán" || status === "Đang hoạt động"
      ? "status-open"
      : status === "Đã khởi hành"
      ? "status-done"
      : status === "Đã hủy"
      ? "status-cancelled"
      : status === "Bảo dưỡng"
      ? "status-maintenance"
      : "status-soon";
  return (
    <span className={`status-badge ${className}`}>
      <i />
      {status}
    </span>
  );
}
function RoutesView({ routes, query, onCreate }) {
  const filtered = routes.filter((route) =>
    `${route.origin} ${route.destination} ${route.id}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return (
    <section className="panel management-panel">
      <div className="panel-toolbar">
        <div>
          <strong>{routes.length} tuyến đường</strong>
          <span>Đang khai thác trên toàn hệ thống</span>
        </div>
        <button
          className="button button-secondary button-small"
          onClick={onCreate}
        >
          <Plus size={15} /> Thêm tuyến
        </button>
      </div>
      <div className="table-scroll">
        <table className="data-table management-table">
          <thead>
            <tr>
              <th>MÃ TUYẾN</th>
              <th>HÀNH TRÌNH</th>
              <th>KHOẢNG CÁCH</th>
              <th>THỜI GIAN</th>
              <th>GIÁ VÉ CƠ BẢN</th>
              <th>GIỜ XUẤT BẾN</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((route) => (
              <tr key={route.id}>
                <td>
                  <span className="record-id">{route.id}</span>
                </td>
                <td>
                  <strong>{route.origin}</strong>
                  <span className="table-sub route-destination">
                    <i />
                    {route.destination}
                  </span>
                </td>
                <td>{route.distance} km</td>
                <td>{route.duration}</td>
                <td>
                  <strong>{formatMoney(route.fare)}</strong>
                </td>
                <td>
                  <span className="time-chips">
                    {route.departures.slice(0, 3).map((time) => (
                      <i key={time}>{time}</i>
                    ))}
                    {route.departures.length > 3 && (
                      <small>+{route.departures.length - 3}</small>
                    )}
                  </span>
                </td>
                <td>
                  <button
                    className="icon-button"
                    aria-label={`Tùy chọn tuyến ${route.id}`}
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <EmptyState message="Không tìm thấy tuyến đường phù hợp." />
        )}
      </div>
    </section>
  );
}
function TripsView({ trips, filter, onFilter, onCreate, onStatusChange }) {
  return (
    <section className="panel management-panel">
      <div className="panel-toolbar">
        <div>
          <strong>{trips.length} chuyến xe</strong>
          <span>Lịch chạy ngày 10 tháng 10, 2026</span>
        </div>
        <div className="toolbar-actions">
          <label className="filter-control">
            <SlidersHorizontal size={15} />
            <select
              aria-label="Lọc theo trạng thái"
              value={filter}
              onChange={(event) => onFilter(event.target.value)}
            >
              {[
                "Tất cả trạng thái",
                "Đang mở bán",
                "Sắp khởi hành",
                "Đã khởi hành",
                "Đã hủy",
              ].map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </label>
          <button
            className="button button-secondary button-small"
            onClick={onCreate}
          >
            <Plus size={15} /> Tạo chuyến
          </button>
        </div>
      </div>
      <div className="table-scroll">
        <table className="data-table management-table">
          <thead>
            <tr>
              <th>MÃ CHUYẾN</th>
              <th>GIỜ ĐI</th>
              <th>TUYẾN ĐƯỜNG</th>
              <th>PHƯƠNG TIỆN</th>
              <th>VÉ ĐÃ BÁN</th>
              <th>TRẠNG THÁI</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>
                  <span className="record-id">{trip.id}</span>
                </td>
                <td>
                  <strong className="departure-time">{trip.departure}</strong>
                  <span className="table-sub">10/10/2026</span>
                </td>
                <td>
                  <strong>{trip.route.split(" → ")[0]}</strong>
                  <span className="table-sub route-destination">
                    <i />
                    {trip.route.split(" → ")[1]}
                  </span>
                </td>
                <td>
                  <strong>{trip.bus}</strong>
                  <span className="table-sub">{trip.plate}</span>
                </td>
                <td>
                  <div className="seat-progress">
                    <span>
                      <strong>{trip.sold}</strong> / {trip.capacity}
                    </span>
                    <i>
                      <b
                        style={{
                          width: `${(trip.sold / trip.capacity) * 100}%`,
                        }}
                      />
                    </i>
                  </div>
                </td>
                <td>
                  <label className="status-select-wrap">
                    <select
                      aria-label={`Trạng thái chuyến ${trip.id}`}
                      value={trip.status}
                      onChange={(event) =>
                        onStatusChange(trip.id, event.target.value)
                      }
                    >
                      {[
                        "Đang mở bán",
                        "Sắp khởi hành",
                        "Đã khởi hành",
                        "Đã hủy",
                      ].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} />
                  </label>
                </td>
                <td>
                  <button
                    className="icon-button"
                    aria-label={`Tùy chọn chuyến ${trip.id}`}
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {trips.length === 0 && (
          <EmptyState message="Không có chuyến xe nào với bộ lọc này." />
        )}
      </div>
    </section>
  );
}
function FleetView({ buses, onCreate }) {
  const [selectedBusId, setSelectedBusId] = useState(buses[0]?.id ?? "");
  const selectedBus = buses.find((bus) => bus.id === selectedBusId) ?? buses[0];
  return (
    <>
      <section className="fleet-summary-strip">
        <div>
          <span className="eyebrow">TỔNG PHƯƠNG TIỆN</span>
          <strong>
            {buses.length} <small>xe</small>
          </strong>
        </div>
        <div>
          <span className="eyebrow">ĐANG KHAI THÁC</span>
          <strong>
            {buses.filter((bus) => bus.status === "Đang hoạt động").length}{" "}
            <small>xe</small>
          </strong>
        </div>
        <div>
          <span className="eyebrow">ĐANG BẢO DƯỠNG</span>
          <strong>
            {buses.filter((bus) => bus.status === "Bảo dưỡng").length}{" "}
            <small>xe</small>
          </strong>
        </div>
        <button
          className="button button-primary button-small"
          onClick={onCreate}
        >
          <Plus size={15} /> Thêm phương tiện
        </button>
      </section>
      <div className="fleet-layout">
        <section className="panel fleet-list-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">DANH SÁCH PHƯƠNG TIỆN</span>
              <h2>Đội xe của nhà xe</h2>
            </div>
            <button className="icon-button" aria-label="Lọc phương tiện">
              <SlidersHorizontal size={17} />
            </button>
          </div>
          <div className="bus-list">
            {buses.map((bus) => (
              <button
                className={`bus-list-item ${
                  selectedBus?.id === bus.id ? "bus-selected" : ""
                }`}
                key={bus.id}
                onClick={() => setSelectedBusId(bus.id)}
              >
                <span className="bus-list-icon">
                  <Bus size={20} />
                </span>
                <span className="bus-list-copy">
                  <strong>{bus.name}</strong>
                  <span>
                    {bus.plate} · {bus.type}
                  </span>
                </span>
                <span className="bus-list-status">
                  <StatusBadge status={bus.status} />
                </span>
                <MoreHorizontal size={17} />
              </button>
            ))}
          </div>
          <div className="driver-details">
            <span className="eyebrow">TÀI XẾ PHỤ TRÁCH</span>
            <div className="driver-row">
              <div className="driver-avatar">
                {selectedBus?.driver.split(" ").slice(-1)[0].slice(0, 1)}
              </div>
              <div>
                <strong>{selectedBus?.driver}</strong>
                <span>{selectedBus?.phone}</span>
              </div>
              <button className="icon-button" aria-label="Gọi tài xế">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
        {selectedBus && (
          <SeatLayoutEditor
            busName={selectedBus.name}
            busType={selectedBus.type}
            capacity={selectedBus.seats}
          />
        )}
      </div>
    </>
  );
}
function ProfileView({ operator, onSave }) {
  return (
    <div className="profile-layout">
      <form className="panel profile-form" onSubmit={onSave}>
        <div className="panel-heading">
          <div>
            <span className="eyebrow">HỒ SƠ ĐỐI TÁC</span>
            <h2>Thông tin nhà xe</h2>
            <p>Cập nhật thông tin hiển thị cho hành khách.</p>
          </div>
          <div className="profile-logo">TD</div>
        </div>
        <div className="form-grid">
          <label className="field field-full">
            <span>Tên nhà xe</span>
            <input defaultValue={operator.name} name="name" required />
          </label>
          <label className="field">
            <span>Hotline</span>
            <input defaultValue={operator.hotline} name="hotline" required />
          </label>
          <label className="field">
            <span>Email liên hệ</span>
            <input
              defaultValue={operator.email}
              name="email"
              type="email"
              required
            />
          </label>
          <label className="field field-full">
            <span>Địa chỉ văn phòng</span>
            <input defaultValue={operator.address} name="address" required />
          </label>
          <label className="field field-full">
            <span>Điều khoản và chính sách</span>
            <textarea defaultValue={operator.policy} name="policy" rows={4} />
          </label>
        </div>
        <div className="form-actions">
          <span>Thông tin được dùng trên trang đặt vé.</span>
          <button className="button button-primary">
            <Check size={16} /> Lưu thay đổi
          </button>
        </div>
      </form>
      <aside className="panel verification-panel">
        <div className="verification-badge">
          <ShieldCheck size={22} />
        </div>
        <span className="eyebrow">TRẠNG THÁI HỒ SƠ</span>
        <h3>Nhà xe đã xác thực</h3>
        <p>Hồ sơ của bạn đã được đội ngũ TAYDO kiểm tra và phê duyệt.</p>
        <div className="verification-line">
          <span>Thông tin doanh nghiệp</span>
          <Check size={16} />
        </div>
        <div className="verification-line">
          <span>Liên hệ và hỗ trợ</span>
          <Check size={16} />
        </div>
        <div className="verification-line">
          <span>Chính sách bán vé</span>
          <Check size={16} />
        </div>
        <button className="text-button" type="button">
          Xem hướng dẫn cập nhật <ArrowRight size={15} />
        </button>
      </aside>
    </div>
  );
}
function CreateDialog({ kind, routes, onClose, onSubmit }) {
  const labels = {
    route: "Thêm tuyến đường",
    trip: "Tạo chuyến xe",
    bus: "Thêm phương tiện",
  };
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="modal-title"
        aria-modal="true"
        className="modal-panel"
        role="dialog"
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">TAYDO · QUẢN LÝ NHÀ XE</span>
            <h2 id="modal-title">{labels[kind]}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Đóng">
            <X size={19} />
          </button>
        </div>
        <form className="modal-form" onSubmit={onSubmit}>
          {kind === "route" && (
            <>
              <Field
                label="Điểm đi"
                name="origin"
                placeholder="Ví dụ: Cần Thơ"
              />
              <Field
                label="Điểm đến"
                name="destination"
                placeholder="Ví dụ: TP. Hồ Chí Minh"
              />
              <div className="form-grid">
                <Field
                  label="Khoảng cách (km)"
                  name="distance"
                  type="number"
                  placeholder="170"
                />
                <Field
                  label="Thời gian dự kiến"
                  name="duration"
                  placeholder="3 giờ 30 phút"
                />
                <Field
                  label="Giá vé cơ bản (đ)"
                  name="fare"
                  type="number"
                  placeholder="180000"
                />
              </div>
            </>
          )}
          {kind === "bus" && (
            <>
              <Field
                label="Tên phương tiện"
                name="name"
                placeholder="Limousine 06"
              />
              <div className="form-grid">
                <Field
                  label="Biển kiểm soát"
                  name="plate"
                  placeholder="65B-023.68"
                />
                <label className="field">
                  <span>Loại xe</span>
                  <select name="type">
                    <option>Limousine 22 phòng</option>
                    <option>Ghế ngồi 29 chỗ</option>
                    <option>Ghế ngồi 45 chỗ</option>
                    <option>Giường nằm 34 chỗ</option>
                    <option>Giường nằm 40 phòng</option>
                  </select>
                </label>
                <Field
                  label="Số chỗ"
                  name="seats"
                  type="number"
                  placeholder="22"
                />
                <Field
                  label="Tên tài xế"
                  name="driver"
                  placeholder="Họ và tên"
                />
                <Field
                  label="Số điện thoại"
                  name="phone"
                  placeholder="09xx xxx xxx"
                />
              </div>
            </>
          )}
          {kind === "trip" && (
            <>
              <label className="field">
                <span>Tuyến đường</span>
                <select defaultValue={routes[0]?.id} name="route">
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.origin} → {route.destination}
                    </option>
                  ))}
                </select>
              </label>
              <div className="form-grid">
                <Field
                  label="Phương tiện"
                  name="bus"
                  placeholder="Limousine 01"
                />
                <Field
                  label="Biển kiểm soát"
                  name="plate"
                  placeholder="65B-018.88"
                />
                <Field
                  label="Giờ xuất bến"
                  name="departure"
                  type="time"
                  required
                />
                <Field label="Ngày chạy" name="date" type="date" required />
                <Field
                  label="Sức chứa"
                  name="capacity"
                  type="number"
                  placeholder="22"
                />
              </div>
            </>
          )}
          <div className="modal-actions">
            <button
              className="button button-secondary"
              onClick={onClose}
              type="button"
            >
              Hủy
            </button>
            <button className="button button-primary">
              <Plus size={16} /> Tạo mới
            </button>
          </div>
          <p className="demo-disclaimer">
            Bản ghi được thêm vào phiên xem trước, chưa ghi xuống cơ sở dữ liệu.
          </p>
        </form>
      </section>
    </div>
  );
}
function Field({ label, name, placeholder, type = "text", required = true }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        name={name}
        placeholder={placeholder}
        type={type}
        required={required}
      />
    </label>
  );
}
function EmptyState({ message }) {
  return (
    <div className="empty-state">
      <Clock3 size={22} />
      <p>{message}</p>
    </div>
  );
}
