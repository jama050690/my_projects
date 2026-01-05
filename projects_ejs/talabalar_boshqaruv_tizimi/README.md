# Talabalar_boshqaruvi_tizimi

Ushbu loyiha Node.js yordamida yozilgan **Talabar_boshqaruv_tizimi** bo‘lib,  
talabalarni yaratish, ko‘rish, yangilash, o‘chirish va filtrlash imkonini beradi.  
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

### talaba modeli

## Har bir talaba quyidagi maydonlarga ega:

id — avtomatik yaratiladi
ism — talaba ismi
familiya — talaba familyasi
yosh- talaba yoshi
guruh —talabanin o'qish guruhi
kurs — talaba o'qish kursi|1|2|3|4
ball — talaba olgan ballar (0-100)

### API Endpoint’lar

## barcha talabalarni olish

GET /api/talabalar

## Response:

[
{
"id": 1,
"ism": "Tolmas",
"familiya": "Urinov",
"yosh": 18,
"guruh": "N4",
"kurs": 1,
"ball": 86
}
]

## Bitta talabani olish

GET /api/talabalar/1

{
"id": 1,
"ism": "Tolmas",
"familiya": "Urinov",
"yosh": 18,
"guruh": "N4",
"kurs": 1,
"ball": 86
}

## Yangi talaba qo‘shish

POST /api/talabalar

{

"ism": "Tolmas",
"familiya": "Urinov",
"yosh": 18,
"guruh": "N4",
"kurs": 1,
"ball": 86
}

## Response:

{
"message": "Talaba muvaffaqiyatli qo'shildi"
}

## talabani yangilash

# PATCh /api/talabalar/1

{
"kurs": 1
}

## Talabani o‘chirish

# DELETE /api/talabalar/1

{
"message": "talaba o'chirildi"
}

# Qo‘shimcha route’lar

# Guruh bo‘yicha filtrlash

GET /api/talabalar?guruh=N4

# Kurs bo‘yicha filtrlash

GET /api/talabalar?muhimlik=yuqori

# Ball bo'yicha saralash

GET /api/talabalar?sort=ball

# 60 baldan yuroqri talabalrni ko'rish

GET /api/talabalar/otlichniklar

## Validatsiya qoidalari

a. Ism va familiya bo'sh bo'lmasligi kerak
b. Yosh 16-30 oralig'ida bo'lishi kerak
c. Kurs 1-4 oralig'ida bo'lishi kerak
d. Ball 0-100 oralig'ida bo'lishi kerak

# Xato javobi:

{
"error": Yosh 16-30 oralig'ida bo'lishi kerak"
}

## HTTP Status kodlari

200 — muvaffaqiyatli so‘rov

201 — yaratildi

400 — noto‘g‘ri ma’lumot

404 — topilmadi

500 — server xatosi
