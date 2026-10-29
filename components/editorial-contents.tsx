export function EditorialContents({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <nav className="hm-contents" aria-label="On this page">
      <p className="hm-overline">On this page</p>
      <ol>{items.map(([id, title]) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}</ol>
    </nav>
  );
}
