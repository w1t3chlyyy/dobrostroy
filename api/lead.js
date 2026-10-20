// Vercel Serverless Function: POST /api/lead -> сообщение в Telegram
// Переменные окружения (Vercel → Settings → Environment Variables):
//   TG_BOT_TOKEN — токен бота от @BotFather
//   TG_CHAT_ID   — id чата/канала/пользователя, куда слать заявки
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }
  const b = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const name = String(b.name || '').trim().slice(0, 60);
  const phone = String(b.phone || '').trim().slice(0, 25);
  const module_ = String(b.module || '').trim().slice(0, 60);
  const page = String(b.page || '').slice(0, 200);

  if (name.length < 2 || phone.replace(/\D/g, '').length !== 11) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }
  const token = process.env.TG_BOT_TOKEN;
  const chat = process.env.TG_CHAT_ID;
  if (!token || !chat) return res.status(500).json({ ok: false, error: 'not_configured' });

  const text =
    `🏠 <b>Новая заявка</b>\n` +
    `Имя: ${esc(name)}\nТелефон: ${esc(phone)}\nМодуль: ${esc(module_)}\n` +
    (page ? `Страница: ${esc(page)}` : '');

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    if (!r.ok) throw new Error('tg ' + r.status);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'upstream' });
  }
};

function safeParse(s) { try { return JSON.parse(s); } catch { return {}; } }
