# Модульные дома — сайт

Статика + одна serverless-функция для заявок. Деплой на Vercel (подойдёт и любой статик-хостинг, но тогда форме нужен свой endpoint).

## Структура
```
public/            ← всё, что отдаётся сайтом
  index.html
  images/          ← ВАШИ ФОТО СЮДА (заменяйте файлы с тем же именем)
    i1.jpg i2.jpg      блок «Сорок пять дней…» (большое / малое)
    t1.jpg … t4.jpg    плитки «Проекты» (дома / бани / дом+баня / хозблоки)
    r1.jpg             фон блока «Отзывы»
    c1.jpg             фото в «Контактах» (вертикальное, 2:3)
    hero-poster.jpg    заставка героя (кадр из видео)
  video/
    hero-4k-120.mp4    4K / 120 fps — для больших экранов
    hero-1080-60.mp4   1080p / 60 fps — остальные и блок «Без бетона»
  favicon.svg robots.txt 404.html privacy.html
api/lead.js        ← приём заявок → Telegram
vercel.json
```

## Деплой
1. Залить папку в GitHub-репозиторий, подключить к Vercel (Framework: Other, Output Directory берётся из `vercel.json`).
2. В Vercel → Settings → Environment Variables добавить:
   - `TG_BOT_TOKEN` — токен бота из @BotFather
   - `TG_CHAT_ID` — id чата, куда слать заявки (бота нужно добавить в чат/написать ему первым)
3. Redeploy.

## Что заменить перед запуском
- Телефон `+7 800 555-35-35` и почта `hello@example.com` — в `public/index.html` (поиск по файлу) и в `privacy.html`.
- Telegram / WhatsApp: в `index.html` в блоке скрипта `var CONFIG={tg:'',wa:''}` — впишите `tg:'username'`, `wa:'+7 900 000-00-00'`; пока пусто — пункты скрыты.
- Адрес и часы работы — список `.cinfo` в блоке «Контакты».
- `privacy.html` — шаблон, впишите реквизиты и согласуйте с юристом.
- Фото: рекомендуем JPG/WebP до ~300 КБ, ширина 1600–2000 px.
