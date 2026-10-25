export default function Loading() {
    return (<main className="loading-shell" aria-label="Đang tải dữ liệu nhà xe">
      <div className="loading-sidebar"/>
      <section className="loading-content">
        <div className="loading-line loading-line-wide"/>
        <div className="loading-stats"><div /><div /><div /><div /></div>
        <div className="loading-table"/>
      </section>
    </main>);
}
