const COURSES = [
  { num: 'I', title: 'Antipasti', desc: 'Закуски' },
  { num: 'II', title: 'Paste & Risotti', desc: 'Паста и ризотто' },
  { num: 'III', title: 'Secondi', desc: 'Горячие блюда' },
  { num: 'IV', title: 'Dolci', desc: 'Десерты' },
]

export default function Menu() {
  return (
    <section id="menu" className="py-[110px] bg-bg-alt ">
      <div className="container">
        <div className="text-center mb-16 reveal">
          <span className="block font-[family-name:var(--font-serif-sc)] text-[0.72rem] font-medium tracking-[0.22em] uppercase text-gold mb-[1rem]">Гастрономия</span>
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5vw,3.6rem)] font-light leading-[1.15] text-text">Наше<br /><em className="italic font-light text-gold">Меню</em></h2>
          <div className="w-12 h-px bg-gold-dim my-[1.6rem] mx-auto relative"><div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-px bg-gold" /></div>
          <p className="text-text-2 max-w-[520px] mx-auto text-[1.05rem] leading-[1.8] mt-5">От antipasti до dolci — каждое блюдо создано с любовью к итальянской традиции и вниманием к детали.</p>
        </div>

        <div className="flex items-center border border-gold-dim mb-16 reveal max-lg:flex-col">
          {COURSES.map((course, i) => (
            <div key={course.num} className="contents">
              <div className="flex-1 text-center py-11 px-9 transition-colors duration-300 hover:bg-gold-faint max-lg:px-7">
                <span className="block font-[family-name:var(--font-serif-sc)] text-[0.65rem] tracking-[0.24em] text-gold mb-3">{course.num}</span>
                <h3 className="text-[1.15rem] font-normal italic text-text mb-2">{course.title}</h3>
                <p className="font-[family-name:var(--font-serif-sc)] text-[0.68rem] tracking-[0.14em] text-text-3 uppercase">{course.desc}</p>
              </div>
              {i < COURSES.length - 1 && <div className="w-px h-20 bg-gold-dim shrink-0 max-lg:w-12 max-lg:h-px" />}
            </div>
          ))}
        </div>

        <div className="text-center reveal">
          <a href="https://drive.google.com/file/d/1p16Zx5lZiuK_zeTQt5H8prUDo4Y79eEV/view" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 font-[family-name:var(--font-serif-sc)] text-[0.78rem] font-normal tracking-[0.18em] uppercase text-text-2 border border-text-3 px-9 py-[13px] transition-colors duration-300 hover:text-gold hover:border-gold-dim group">
            <span>Открыть полное меню</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"><path d="M2.5 7h9M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
