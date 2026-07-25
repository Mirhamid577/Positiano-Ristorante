import { useState, useEffect, useRef } from 'react'

const TIME_OPTIONS = ['12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30']
const GUEST_OPTIONS = ['1','2','3','4','5','6','7','8+']

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 9)
  const parts = []
  if (digits.length > 0) parts.push(digits.slice(0, 2))
  if (digits.length > 2) parts.push(digits.slice(2, 5))
  if (digits.length > 5) parts.push(digits.slice(5, 7))
  if (digits.length > 7) parts.push(digits.slice(7, 9))
  return parts.join(' ')
}

export default function Reservation() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [minDate, setMinDate] = useState('')
  const [phone, setPhone] = useState('')
  const formRef = useRef(null)

  useEffect(() => { setMinDate(new Date().toISOString().split('T')[0]) }, [])

  const handlePhoneChange = (e) => {
    setPhone(formatPhone(e.target.value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const form = formRef.current
    if (!form.checkValidity()) { form.reportValidity(); return }

    const phoneDigits = phone.replace(/\s/g, '')
    if (phoneDigits.length !== 9) {
      setError('Введите полный номер телефона (9 цифр)')
      return
    }

    setSending(true)

    const formData = {
      name: form.elements.name.value,
      phone: '+998 ' + phone,
      date: form.elements.date.value,
      time: form.elements.time.value,
      guests: form.elements.guests.value,
      notes: form.elements.notes.value || '—',
    }

    try {
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error()
      setSent(true)
      setTimeout(() => { form.reset(); setPhone(''); setSent(false) }, 5000)
    } catch {
      setError('Ошибка отправки. Попробуйте позвонить нам: +998 99 300 01 11')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="reservation" className="py-[110px] bg-bg-alt">
      <div className="container">
        <div className="text-center mb-[64px] reveal">
          <span className="section-label">Бронирование</span>
          <h2>Забронировать<br /><em>столик</em></h2>
          <div className="hairline hairline-center" />
          <p className="section-intro mt-5">Заполните форму — мы свяжемся для подтверждения.<br />Или позвоните нам: <a href="tel:+998993000111">+998 99 300 01 11</a></p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="res-form reveal" noValidate>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="f-name">Имя фамилия</label>
              <input type="text" id="f-name" name="name" placeholder="Имя и фамилия" required autoComplete="name" />
            </div>
            <div className="form-field">
              <label htmlFor="f-phone">Телефон</label>
              <div className="phone-input-wrap">
                <span className="phone-prefix">+998</span>
                <input
                  type="tel"
                  id="f-phone"
                  name="phone"
                  className="phone-input"
                  placeholder="XX XXX XX XX"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>

          <div className="form-row form-row--3">
            <div className="form-field">
              <label htmlFor="f-date">Дата</label>
              <input type="date" id="f-date" name="date" required min={minDate} />
            </div>
            <div className="form-field">
              <label htmlFor="f-time">Время</label>
              <select id="f-time" name="time" required defaultValue="">
                <option value="" disabled>— выберите —</option>
                {TIME_OPTIONS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="f-guests">Гостей</label>
              <select id="f-guests" name="guests" required defaultValue="">
                <option value="" disabled>—</option>
                {GUEST_OPTIONS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="f-notes">Пожелания</label>
            <textarea id="f-notes" name="notes" rows="3" placeholder="Особые пожелания, аллергии, повод для визита…" />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="form-submit">
            <button type="submit" disabled={sending || sent} className={`btn-submit${sent ? ' sent' : ''}`}>
              <span className="btn-label">{sending ? 'Отправка…' : 'Отправить заявку'}</span>
              <span className="btn-sent" aria-hidden="true">Заявка принята</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
