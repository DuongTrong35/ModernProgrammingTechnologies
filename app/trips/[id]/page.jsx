import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/header";
import SeatLayoutEditor from "@/components/seat-layout-editor";
import { getManagerData } from "@/services/manager.service";

export default async function TripDetailPage({ params }) {
  const [{ id }, data] = await Promise.all([params, getManagerData()]);
  const trip = data.trips.find((item) => item.id === id && item.status !== "Đã hủy");
  if (!trip) notFound();
  const bus = data.buses.find((item) => item.name === trip.bus);
  const fare = data.routes.find((route) => route.id === trip.routeId)?.fare ?? 0;

  return (
    <main className="public-page">
      <SiteHeader />
      <section className="public-results trip-detail">
        <Link className="back-link" href="/trips">← Tất cả chuyến</Link><span className="eyebrow">CHI TIẾT HÀNH TRÌNH</span><h1>{trip.route}</h1>
        <div className="trip-detail-summary"><strong>{trip.departure}</strong><span>{trip.date}</span><span>{trip.bus} · {trip.plate}</span><strong>{new Intl.NumberFormat("vi-VN").format(fare)}đ</strong></div>
        {bus && <SeatLayoutEditor busName={bus.name} busType={bus.type} capacity={bus.seats}/>}
        <p className="trip-terms">Đổi vé trước giờ khởi hành tối thiểu 6 giờ. Vui lòng có mặt tại bến trước giờ đi 20 phút.</p>
      </section>
    </main>
  );
}