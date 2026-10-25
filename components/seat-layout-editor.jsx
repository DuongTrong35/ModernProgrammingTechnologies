"use client";
import { useState } from "react";
import { Check, Layers2, Save } from "lucide-react";
const soldSeats = new Set(["Dưới-A02", "Dưới-A05", "Dưới-B03", "Dưới-B08", "Trên-A01", "Trên-B04"]);
export default function SeatLayoutEditor({ busName, busType, capacity }) {
    const [floor, setFloor] = useState("Dưới");
    const [selectedSeats, setSelectedSeats] = useState(["Dưới-A01", "Dưới-B02"]);
    const [notice, setNotice] = useState("");
    const hasUpperFloor = busType.toLowerCase().includes("giường nằm");
    const activeFloor = hasUpperFloor ? floor : "Dưới";
    const seatsPerFloor = hasUpperFloor ? Math.ceil(capacity / 2) : capacity;
    const positions = Array.from({ length: seatsPerFloor }, (_, index) => index);
    function toggleSeat(seatId) {
        if (soldSeats.has(seatId))
            return;
        setSelectedSeats((current) => current.includes(seatId)
            ? current.filter((seat) => seat !== seatId)
            : [...current, seatId]);
        setNotice("");
    }
    return (<section className="panel seat-panel">
      <div className="panel-heading seat-heading">
        <div>
          <span className="eyebrow">CẤU HÌNH PHƯƠNG TIỆN</span>
          <h2>Sơ đồ chỗ ngồi</h2>
          <p>{busName} <span className="muted-dot">·</span> {capacity} vị trí</p>
        </div>
        <button className="icon-button" title="Quản lý tầng xe" aria-label="Quản lý tầng xe"><Layers2 size={18}/></button>
      </div>

      {hasUpperFloor && <div className="floor-switch" role="tablist" aria-label="Tầng xe">
        {["Dưới", "Trên"].map((level) => (<button className={floor === level ? "floor-option is-active" : "floor-option"} key={level} onClick={() => setFloor(level)} role="tab" aria-selected={floor === level}>
            Tầng {level}
          </button>))}
      </div>}

      <div className="bus-map-wrap">
        <div className="bus-map">
          <div className="driver-cabin"><span>ĐẦU XE</span><span className="steering-mark">◉</span></div>
          <div className="seat-grid">
            {positions.map((position) => {
            const letter = position % 4 < 2 ? "A" : "B";
            const label = `${letter}${String(Math.floor(position / 4) * 2 + (position % 2) + 1).padStart(2, "0")}`;
            const seatId = `${activeFloor}-${label}`;
            const isSold = soldSeats.has(seatId);
            const isSelected = selectedSeats.includes(seatId);
            return (<button aria-label={`Tầng ${activeFloor}, chỗ ${label}${isSold ? ", đã bán" : isSelected ? ", đang chọn" : ", còn trống"}`} aria-pressed={isSelected} className={`seat ${isSold ? "seat-sold" : isSelected ? "seat-selected" : ""}`} disabled={isSold} key={`${activeFloor}-${position}`} onClick={() => toggleSeat(seatId)}>
                  {label}
                </button>);
        })}
          </div>
          <div className="bus-rear">CUỐI XE</div>
        </div>
      </div>

      <div className="seat-legend">
        <span><i className="legend-seat legend-empty"/> Còn trống</span>
        <span><i className="legend-seat legend-picked"/> Đang chọn</span>
        <span><i className="legend-seat legend-sold"/> Đã bán</span>
      </div>
      <div className="seat-footer">
        <span><strong>{selectedSeats.length}</strong> vị trí đã chọn</span>
        <button className="button button-primary button-small" onClick={() => setNotice("Sơ đồ ghế đã được lưu trong bản xem trước.")}>
          <Save size={15}/> Lưu sơ đồ
        </button>
      </div>
      {notice && <p className="inline-notice" role="status"><Check size={14}/>{notice}</p>}
    </section>);
}
