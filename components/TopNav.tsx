import Link from "next/link";

export function TopNav({ link }: { link: { href: string; label: string } }) {
  return (
    <header className="top-nav">
      <Link href="/" className="wordmark">
        where2go
      </Link>
      <Link href={link.href} className="nav-link">
        {link.label}
      </Link>
    </header>
  );
}
