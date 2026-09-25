const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Brands', href: '#brands' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__brand">© 2026 Falcon Creative Works · falconcreativeworks.com</p>
        <nav className="footer__nav" aria-label="Footer">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <p className="footer__tag">Crafted with AI, graded like cinema.</p>
      </div>
    </footer>
  )
}
