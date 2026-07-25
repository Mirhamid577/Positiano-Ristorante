export default function About() {
  return (
    <section id="about" className="py-[110px]">
      <div className="container h-[900px] flex justify-center">
        <div className="grid grid-cols-2 gap-[80px] items-center max-lg:grid-cols-1 max-lg:gap-[56px]">
          <div className="reveal">
            <span className="block font-[family-name:var(--font-serif-sc)] text-[0.72rem] font-medium tracking-[0.22em] uppercase text-gold mb-4">Наша история</span>
            <h2 className="font-[family-name:var(--font-serif)] text-[clamp(2.4rem,5vw,3.6rem)] font-light leading-[1.15] text-text">Философия<br /><em className="italic font-light text-gold">Позитано</em></h2>
            <div className="w-12 h-px bg-gold-dim mt-6 mb-6 relative"><div className="absolute top-0 left-0 w-4 h-px bg-gold" /></div>
            <p className="text-text-2 mb-5 text-[1.05rem]">Positano — это не просто ресторан. Это путешествие к берегам Амальфийского побережья, где каждое блюдо рассказывает историю, а каждый вечер превращается в незабываемое воспоминание.</p>
            <p className="text-text-2 mb-5 text-[1.05rem]">Мы верим, что великая итальянская кухня — это прежде всего простота, возведённая в искусство: лучшие ингредиенты, мастерство шефа и тепло подлинного итальянского гостеприимства.</p>
            <p className="text-text-2 text-[1.05rem]">Каждое блюдо в нашем меню — дань уважения вековым традициям, переосмысленным с современным изяществом.</p>
          </div>
          <div className="relative reveal reveal-right">
            <div className="relative overflow-hidden">
              <img src="/hf_dish.png" alt="Фирменное блюдо Positano" className="w-full aspect-[3/4] object-cover transition-transform duration-700 hover:scale-[1.03]" />
            </div>
            <div className="absolute top-4 -right-4 -bottom-4 left-4 border border-gold-dim z-[-1] pointer-events-none max-lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  )
}
