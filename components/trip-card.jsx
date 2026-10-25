import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function TripCard({ trip, fare }) {
  return (
    <article className="public-trip-card">
      <div className="public-trip-time"><strong>{trip.departure}</strong><span>{trip.date}</span></div>
      <div className="public-trip-route"><strong>{trip.route}</strong><span>{trip.bus} · {trip.capacity - trip.sold} chỗ còn trống</span></div>
      <div className="public-trip-price"><strong>{formatCurrency(fare)}</strong><span>mỗi hành khách</span></div>
      <Link className="button button-primary" href={`/trips/${trip.id}`}>Chọn chỗ</Link>
    </article>
  );
}