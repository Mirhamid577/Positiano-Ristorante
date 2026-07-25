let reservationCount = 0

const TG_BOT_TOKEN = '8887394233:AAHgsyX3KkEqUQFE3vPb7p0qMVNBAYzuYTs'
const TG_CHAT_ID = '5303076610'

function buildMessage(data) {
  reservationCount = reservationCount >= 100 ? 1 : reservationCount + 1
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

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

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}
