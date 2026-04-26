import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="top-nav">
      <div className="container top-nav-inner">
        <Link className="brand" href="/">
          AI Health Match
        </Link>
        <nav className="nav-links">
          <Link href="/">Symptom Checker</Link>
          <Link href="/result">AI Result</Link>
          <Link href="/doctors">Doctor List</Link>
        </nav>
      </div>
    </header>
  );
}
