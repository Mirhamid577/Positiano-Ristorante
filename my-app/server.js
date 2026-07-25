import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json())

const TG_BOT_TOKEN = '8887394233:AAHgsyX3KkEqUQFE3vPb7p0qMVNBAYzuYTs'
const TG_CHAT_ID = '5303076610'

const COUNTER_FILE = path.join(__dirname, 'reservation_counter.json')

let reservationCount = 0
try {
  const data = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf-8'))
  reservationCount = data.count || 0
} catch {
  reservationCount = 0
}

function buildMessage(data) {
  reservationCount = reservationCount >= 100 ? 1 : reservationCount + 1
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: reservationCount }))
  return [
    `📋 Заявка #${reservationCount}`,
    '',
    `👤 Имя: ${data.name}`,
    `📞 Телефон: ${data.phone}`,
    `📅 Дата: ${data.date}`,
    `🕐 Время: ${data.time}`,
    `👥 Гостей: ${data.guests}`,
    `📝 Пожелания: ${data.notes}`,
  ].join('\n')
}

app.post('/api/reservation', async (req, res) => {
  try {
    const { name, phone, date, time, guests, notes } = req.body

    if (!name || !phone || !date || !time || !guests) {
      return res.status(400).json({ ok: false, error: 'Заполните все обязательные поля' })
    }

    const text = buildMessage({ name, phone, date, time, guests, notes: notes || '—' })

    const tgRes = await fetch(
      `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TG_CHAT_ID,
          text,
        }),
      }
    )

    if (!tgRes.ok) {
      return res.status(502).json({ ok: false, error: 'Telegram API error' })
    }

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: 'Server error' })
  }
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
