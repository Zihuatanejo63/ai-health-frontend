export default function Loading() {
  return (
    <section className="app-page">
      <div className="loading-shell">
        <div className="loading-placeholder" style={{ height: 40, width: "60%", marginBottom: 16 }} />
        <div className="loading-placeholder" style={{ height: 20, width: "40%", marginBottom: 32 }} />
        <div className="loading-placeholder" style={{ height: 200 }} />
      </div>
    </section>
  );
}
