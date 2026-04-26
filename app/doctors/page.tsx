import { doctors } from "@/lib/mock-doctors";

export default function DoctorsPage() {
  return (
    <section>
      <h1 className="page-title">Doctor List</h1>
      <p className="page-subtitle">
        Mock data for MVP. Doctors are matched by specialty and availability.
      </p>

      <div className="doctor-grid" style={{ marginTop: 18 }}>
        {doctors.map((doctor) => (
          <article className="panel doctor-card" key={doctor.id}>
            <h2 className="doctor-name">{doctor.name}</h2>
            <p className="doctor-meta">{doctor.specialty}</p>
            <p className="doctor-meta">
              Rating {doctor.rating} · ${doctor.feeUsd}/session ·{" "}
              {doctor.available ? "Available now" : "Next availability required"}
            </p>
            <div className="doctor-tags">
              {doctor.tags.map((tag) => (
                <span className="doctor-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <button className="btn-primary" type="button">
              Book Consultation
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
