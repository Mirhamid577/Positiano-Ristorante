export default function Footer() {
  return (
    <footer id="footer" className="bg-bg border-t border-gold-dim pt-20 pb-10">
      <div className="container">
        <div className="text-center mb-10">
          <img src="/logo.png" alt="Positano Ristorante" className="h-11 w-auto object-contain inline-block opacity-[0.85]" />
          <div className="font-[family-name:var(--font-serif-sc)] text-[0.65rem] tracking-[0.28em] text-text-3 uppercase mt-3">Ташкент · Италия</div>
        </div>
        <div className="w-full h-px bg-gold-dim mb-12" />
        <div className="grid grid-cols-3 gap-12 pb-12 border-b border-white/[0.04] max-md:grid-cols-1 max-md:gap-9">
          <div>
            <h4 className="font-[family-name:var(--font-serif-sc)] text-[0.65rem] font-medium tracking-[0.22em] uppercase text-gold mb-4">Адрес</h4>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="block text-[0.95rem] text-text-2 leading-[1.7] transition-colors duration-200 hover:text-text">Taras Shevchenko ko'chasi 38А<br />100060, Ташкент</a>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-serif-sc)] text-[0.65rem] font-medium tracking-[0.22em] uppercase text-gold mb-4">Контакты</h4>
            <a href="tel:+998993000111" className="block text-[0.95rem] text-text-2 leading-[1.7] transition-colors duration-200 hover:text-text">+998 99 300 01 11</a>
            <a href="https://www.instagram.com/positano_rest" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-1.5 text-[0.95rem] text-text-2 transition-colors duration-200 hover:text-text">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg>
              @positano_rest
            </a>
          </div>
          <div>
            <h4 className="font-[family-name:var(--font-serif-sc)] text-[0.65rem] font-medium tracking-[0.22em] uppercase text-gold mb-4">Режим работы</h4>
            <p className="text-[0.95rem] text-text-2 leading-[1.7]">12:00 — 23:00<br /><span className="font-[family-name:var(--font-serif-sc)] text-[0.7rem] tracking-[0.14em] text-text-3 uppercase">Ежедневно</span></p>
          </div>
        </div>
        <div className="pt-8 text-center text-[0.78rem] text-text-3 font-[family-name:var(--font-serif-sc)] tracking-[0.08em]">&copy; 2025 Positano Ristorante. Все права защищены.</div>
      </div>
    </footer>
  )
}
