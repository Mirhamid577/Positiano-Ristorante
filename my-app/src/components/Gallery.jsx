import { useEffect, useRef, useCallback } from 'react'

export default function Gallery() {
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

  return (
    <section id="atmosphere" className="section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Пространство</span>
          <h2>Атмосфера<br /><em>Позитано</em></h2>
          <div className="hairline hairline-center" />
          <p className="section-intro">Каждая деталь продумана, чтобы ваш вечер стал особенным.</p>
        </div>

        <div className="gallery reveal">
          <div className="gallery-item gallery-item--tall">
            <img src="/gallery_1.jpg" alt="Авторское блюдо Positano" />
            <div className="gallery-caption">Авторская кухня</div>
          </div>
          <div className="gallery-item">
            <img src="/gallery_2.jpg" alt="Аперитив Positano" />
            <div className="gallery-caption">Аперитив</div>
          </div>
          <div className="gallery-item gallery-item--video">
            <video ref={videoRef} autoPlay muted playsInline loop preload="auto" onEnded={restart}>
              <source src="/positano.mp4" type="video/mp4" />
            </video>
            <div className="gallery-video-veil" />
            <div className="gallery-caption">Вечер в Positano</div>
          </div>
        </div>
      </div>
    </section>
  )
}
