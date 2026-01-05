# Todo List API — Topshiriq

Ushbu loyiha Node.js yordamida yozilgan **Todo List CRUD API** bo‘lib,  
vazifalarni yaratish, ko‘rish, yangilash, o‘chirish va filtrlash imkonini beradi.  
Ma’lumotlar JSON faylda saqlanadi va API Postman orqali tekshiriladi.

---

## Loyihani ishga tushirish

### 1 Bog‘liqliklarni o‘rnatish

bash
pnpm install

### 2️ Serverni ishga tushirish

bash

pnpm start

### yoki development rejimida:

bash

pnpm dev

### Server manzili:

http://localhost:3000

### Vazifa modeli

## Har bir vazifa quyidagi maydonlarga ega:

Vazifa modeli:
○ id (avtomatik)
○ sarlavha
○ tavsif
○ status (yangi, jarayonda, tugallangan)
○ muhimlik (past, o'rta, yuqori)
○ muddat (sana)
○ yaratilganVaqt

### API Endpoint’lar

## barcha vazifalarni olish

GET /api/vazifalar

## Response:

[
{
"id": 1,
"sarlavha": "Backend API yozish",
"tavsif": "Todo CRUD",
"status": "yangi",
"muhimlik": "yuqori",
"muddat": "2025-12-25",
"yaratilganVaqt": "2025-12-19T16:00:00.000Z"
}
]

## Bitta vazifani olish

GET /api/vazifalar/1

{
"id": 1,
"sarlavha": "Backend API yozish",
"status": "yangi"
}

## Yangi vazifa qo‘shish

POST /api/vazifalar

{
"sarlavha": "Frontend qilish",
"tavsif": "React bilan",
"status": "yangi",
"muhimlik": "o'rta",
"muddat": "2025-12-30"
}

## Response:

{
"message": "Vazifa muvaffaqiyatli qo'shildi"
}

## Vazifani yangilash

# PUT /api/vazifalar/1

{
"status": "jarayonda"
}

## Vazifani o‘chirish

# DELETE /api/vazifalar/1

{
"message": "Vazifa o'chirildi"
}

# Qo‘shimcha route’lar

# Status bo‘yicha filtrlash

GET /api/vazifalar?status=tugallangan

# Muhimlik bo‘yicha filtrlash

GET /api/vazifalar?muhimlik=yuqori

# Bugungi vazifalar

GET /api/vazifalar/bugun

# Muddati o‘tgan vazifalar

GET /api/vazifalar/kech-qolgan

## Vazifa statusini o‘zgartirish

# PATCH /api/vazifalar/1/status

{
"status": "tugallangan"
}

## Validatsiya qoidalari

Sarlavha bo‘sh bo‘lmasligi kerak

Status faqat: yangi, jarayonda, tugallangan

Muddat bugungi sanadan oldin bo‘lmasligi kerak

# Xato javobi:

{
"error": "Status faqat belgilangan qiymatlardan biri bo'lishi kerak"
}

## HTTP Status kodlari

200 — muvaffaqiyatli so‘rov

201 — yaratildi

400 — noto‘g‘ri ma’lumot

404 — topilmadi

500 — server xatosi
