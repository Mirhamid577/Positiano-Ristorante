import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { href: '#about', label: 'О нас' },
  { href: '#menu', label: 'Меню' },
  { href: '#atmosphere', label: 'Атмосфера' },
  { href: '#reservation', label: 'Бронирование' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(sec => obs.observe(sec))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 76
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        id="nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'nav-scrolled' : ''
        }`}
      >
        <div className="nav-inner">
          <a href="#hero" onClick={e => handleNavClick(e, '#hero')} className="nav-logo">
            <img src="/logo.png" alt="Positano Ristorante" />
          </a>

          <ul className="nav-links">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href)}
                  className={`nav-link${activeSection === item.href.slice(1) ? ' nav-link-active' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#reservation"
            onClick={e => handleNavClick(e, '#reservation')}
            className="nav-cta"
          >
            Забронировать
          </a>

          <button
            className={`nav-toggle${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Открыть меню"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div
        id="mobile-overlay"
        className={mobileOpen ? 'open' : ''}
        onClick={() => setMobileOpen(false)}
      />

      <div
        id="mobile-menu"
        className={mobileOpen ? 'open' : ''}
        aria-hidden={!mobileOpen}
      >
        <ul>
          {NAV_ITEMS.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={e => handleNavClick(e, item.href)}
                className="mobile-link"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="tel:+998993000111" className="mobile-phone">+998 99 300 01 11</a>
      </div>
    </>
  )
}
