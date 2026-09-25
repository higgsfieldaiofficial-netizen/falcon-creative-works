import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Brands', href: '#brands' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const WHATSAPP = 'https://wa.me/917835941665'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__wordmark" aria-label="Falcon Creative Works — back to top">
          <span className="nav__wordmark-full">Falcon Creative Works</span>
          <span className="nav__wordmark-short" aria-hidden="true">
            Falcon<sup>®</sup>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="btn btn--small nav__cta" href={WHATSAPP} target="_blank" rel="noopener">
            Start a project
          </a>
          <button
            type="button"
            className={`nav__toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="nav__mobile" aria-label="Mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="btn" href={WHATSAPP} target="_blank" rel="noopener">
            Start a project
          </a>
        </nav>
      )}
    </header>
  )
}
