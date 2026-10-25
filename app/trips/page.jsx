import Link from "next/link";
import SiteHeader from "@/components/header";
import TripCard from "@/components/trip-card";
import { getManagerData } from "@/services/manager.service";

export default async function TripsPage({ searchParams }) {
  const [data, query] = await Promise.all([getManagerData(), searchParams]);
  const from = String(query.from || "").toLocaleLowerCase("vi");
  const to = String(query.to || "").toLocaleLowerCase("vi");
  const trips = data.trips.filter((trip) => trip.status !== "Đã hủy" && trip.route.toLocaleLowerCase("vi").includes(from) && trip.route.toLocaleLowerCase("vi").includes(to));

  return (
    <main className="public-page">
      <SiteHeader />
      <section className="public-results"><span className="eyebrow">LỊCH KHỞI HÀNH</span><h1>{query.from && query.to ? `${query.from} → ${query.to}` : "Chọn chuyến xe phù hợp"}</h1><p>{trips.length} chuyến đang mở bán</p>
        <div className="public-trip-list">{trips.length ? trips.map((trip) => <TripCard key={trip.id} trip={trip} fare={data.routes.find((route) => route.id === trip.routeId)?.fare ?? 0}/>) : <p className="public-empty">Chưa có chuyến phù hợp. Thử thay đổi điểm đi hoặc điểm đến.</p>}</div>
      </section>
    </main>
  );
}