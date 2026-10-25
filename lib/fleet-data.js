const dashboardData = {
    operator: {
        name: "TAYDO Bus Lines",
        hotline: "1900 636 363",
        email: "hotro@taydobus.vn",
        address: "102 Nguyễn Văn Linh, Ninh Kiều, Cần Thơ",
        policy: "Hành khách có thể đổi vé trước giờ khởi hành tối thiểu 6 giờ. Hành lý xách tay không quá 20 kg.",
    },
    routes: [
        { id: "RT-001", origin: "Cần Thơ", destination: "TP. Hồ Chí Minh", distance: 170, duration: "3 giờ 30 phút", fare: 180000, departures: ["06:30", "09:00", "13:30", "20:45"] },
        { id: "RT-002", origin: "Cần Thơ", destination: "Đà Lạt", distance: 464, duration: "10 giờ", fare: 445000, departures: ["17:00", "19:30"] },
        { id: "RT-003", origin: "TP. Hồ Chí Minh", destination: "Đà Nẵng", distance: 964, duration: "18 giờ", fare: 620000, departures: ["07:00", "18:30"] },
        { id: "RT-004", origin: "Cần Thơ", destination: "Long Xuyên", distance: 62, duration: "1 giờ 45 phút", fare: 95000, departures: ["07:15", "10:00", "14:00", "17:30"] },
    ],
    trips: [
        { id: "TD-24081", routeId: "RT-001", route: "Cần Thơ → TP. Hồ Chí Minh", bus: "Limousine 01", plate: "65B-018.88", departure: "06:30", date: "2026-10-10", sold: 18, capacity: 22, status: "Đang mở bán" },
        { id: "TD-24082", routeId: "RT-002", route: "Cần Thơ → Đà Lạt", bus: "Giường nằm 02", plate: "65B-021.45", departure: "17:00", date: "2026-10-10", sold: 31, capacity: 34, status: "Sắp khởi hành" },
        { id: "TD-24083", routeId: "RT-004", route: "Cần Thơ → Long Xuyên", bus: "Ghế ngồi 03", plate: "65B-019.26", departure: "10:00", date: "2026-10-10", sold: 26, capacity: 29, status: "Đã khởi hành" },
        { id: "TD-24084", routeId: "RT-001", route: "Cần Thơ → TP. Hồ Chí Minh", bus: "Limousine 04", plate: "65B-022.10", departure: "13:30", date: "2026-10-10", sold: 9, capacity: 22, status: "Đang mở bán" },
        { id: "TD-24085", routeId: "RT-003", route: "TP. Hồ Chí Minh → Đà Nẵng", bus: "Giường nằm 05", plate: "65B-020.64", departure: "18:30", date: "2026-10-10", sold: 0, capacity: 40, status: "Đã hủy" },
    ],
    buses: [
        { id: "BUS-01", name: "Limousine 01", plate: "65B-018.88", type: "Limousine 22 phòng", seats: 22, driver: "Nguyễn Minh Tâm", phone: "0918 234 567", status: "Đang hoạt động" },
        { id: "BUS-02", name: "Giường nằm 02", plate: "65B-021.45", type: "Giường nằm 34 chỗ", seats: 34, driver: "Trần Quốc Bảo", phone: "0907 681 234", status: "Đang hoạt động" },
        { id: "BUS-03", name: "Ghế ngồi 03", plate: "65B-019.26", type: "Ghế ngồi 29 chỗ", seats: 29, driver: "Lê Hoàng Phúc", phone: "0939 112 456", status: "Bảo dưỡng" },
        { id: "BUS-04", name: "Limousine 04", plate: "65B-022.10", type: "Limousine 22 phòng", seats: 22, driver: "Phạm Anh Khoa", phone: "0981 335 677", status: "Đang hoạt động" },
    ],
};
export async function getFleetDashboardData() {
    const apiUrl = process.env.FLEET_API_URL;
    if (apiUrl) {
        const response = await fetch(`${apiUrl}/operator/dashboard`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error("Không thể tải dữ liệu vận hành nhà xe.");
        }
        return response.json();
    }
    return dashboardData;
}
