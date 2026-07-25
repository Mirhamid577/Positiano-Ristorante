import { useEffect, useRef, useCallback } from 'react'

export default function Hero() {
  const videoRef = useRef(null)

  const restart = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play().catch(() => {})
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {
      const resume = () => { video.play().catch(() => {}); document.removeEventListener('click', resume) }
      document.addEventListener('click', resume, { once: true })
    })
  }, [])

  const handleScroll = (e) => {
    e.preventDefault()
    const target = document.querySelector('#about')
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 76
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative h-dvh min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} autoPlay muted playsInline loop preload="auto" onEnded={restart} className="w-full h-full object-cover object-center">
          <source src="/positano.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(8,6,4,0.55) 0%, rgba(8,6,4,0.40) 40%, rgba(8,6,4,0.60) 75%, rgba(8,6,4,0.85) 100%)' }} />

      <div className="absolute inset-0 z-[2]" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 75%, rgba(110,50,12,0.18) 0%, transparent 65%)', animation: 'glowpulse 6s ease-in-out infinite' }} />

      <div className="relative z-[3] text-center flex flex-col items-center gap-0" style={{ animation: 'heroEntrance 1.2s cubic-bezier(0,0,0.2,1) both' }}>
        <img src="/logo.png" alt="Positano" className="w-[clamp(140px,19vw,720px)] mx-auto h-auto object-contain" style={{ animation: 'heroEntrance 1.2s 0.2s cubic-bezier(0,0,0.2,1) both' }} />

        <div className="w-12 h-px bg-gold-dim my-7 mx-auto" style={{ animation: 'heroEntrance 1s 0.5s cubic-bezier(0,0,0.2,1) both' }} />

        <p className="font-[family-name:var(--font-serif)] text-[clamp(1.3rem,3.2vw,2rem)] font-light leading-[1.5] text-text-2 tracking-[0.03em] mb-10" style={{ animation: 'heroEntrance 1s 0.65s cubic-bezier(0,0,0.2,1) both' }}>
          Настоящая Италия<br />
          <em className="italic font-light text-text">в сердце Ташкента</em>
        </p>

        <a href="#reservation" onClick={handleScroll} className="inline-block font-[family-name:var(--font-serif-sc)] text-[0.8rem] font-normal tracking-[0.2em] uppercase text-gold border border-gold-dim px-10 py-[14px] relative overflow-hidden transition-all duration-300 group" style={{ animation: 'heroEntrance 1s 0.85s cubic-bezier(0,0,0.2,1) both' }}>
          <span className="relative z-[1] group-hover:text-bg transition-colors duration-300">Забронировать столик</span>
          <span className="absolute inset-0 bg-gold transform scale-x-0 origin-left transition-transform duration-350 group-hover:scale-x-100 z-0" />
        </a>
      </div>

      <a href="#about" onClick={handleScroll} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center" aria-label="Прокрутить вниз" style={{ animation: 'gentleBounce 2.5s 2s ease-in-out infinite' }}>
        <span className="block w-px h-[52px]" style={{ background: 'linear-gradient(to bottom, rgba(201,169,110,0.25), transparent)', animation: 'scrollpulse 2s ease-in-out infinite' }} />
      </a>
    </section>
  )
}
