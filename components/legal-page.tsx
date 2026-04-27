type LegalPageProps = {
  title: string;
  updated: string;
  sections: Array<{
    heading: string;
    body: string | string[];
  }>;
};

export function LegalPage({ title, updated, sections }: LegalPageProps) {
  return (
    <section className="panel legal-page">
      <p className="page-subtitle">Last updated: {updated}</p>
      <h1 className="page-title">{title}</h1>
      {sections.map((section) => (
        <section className="legal-section" key={section.heading}>
          <h2>{section.heading}</h2>
          {Array.isArray(section.body) ? (
            <ul>
              {section.body.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{section.body}</p>
          )}
        </section>
      ))}
    </section>
  );
}
