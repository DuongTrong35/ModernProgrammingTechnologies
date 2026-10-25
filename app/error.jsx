"use client";
export default function Error({ reset }) {
    return (<main className="error-screen">
      <div className="error-content">
        <span className="eyebrow">TAYDO · NHÀ XE</span>
        <h1>Chưa thể tải dữ liệu</h1>
        <p>Đã có lỗi khi mở trang quản lý. Thử tải lại để tiếp tục vận hành.</p>
        <button className="button button-primary" onClick={reset}>Thử lại</button>
      </div>
    </main>);
}
