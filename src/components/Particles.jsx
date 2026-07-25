import { useMemo } from 'react'

export default function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      duration: 14 + Math.random() * 16,
      delay: Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.2,
    })), [])

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div key={p.id} className="absolute bottom-[-20px] rounded-full pointer-events-none" style={{
          left: p.left,
          width: `${p.size}px`,
          height: `${p.size}px`,
          background: `radial-gradient(circle, rgba(201,169,110,${p.opacity}), transparent)`,
          boxShadow: `0 0 ${p.size * 2}px rgba(201,169,110,${p.opacity * 0.5})`,
          animation: `floatUp ${p.duration}s ${p.delay}s linear infinite`,
          willChange: 'transform, opacity',
        }} />
      ))}
    </div>
  )
}
