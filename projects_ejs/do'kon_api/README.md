# Do'kon_api

Ushbu loyiha Node.js yordamida yozilgan **Do'kon_Api CRUD API** bo‘lib,  
mahsulotlarni yaratish, ko‘rish, yangilash, o‘chirish va filtrlash imkonini beradi.  
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

### mahsulot modeli

## Har bir mahsulot quyidagi maydonlarga ega:

{
"nomi": "Mahsulot nomi",
"narx": maxsulot narxi(sonda),
"kategoriya": (elektronika,kiyim-kechak,oziq-ovqat..),
"miqdor": Miqdori sonda,
"tavsif": "Qaysi nomdagi yoki ishlab chiqaruvchi"
}

### API Endpoint’lar

## barcha mahsulotlarni olish

GET /api/mahsulotlar

## Response:

[
{
"id": 1,
"nomi": "Televizor",
"narx": 5000000,
"kategoriya": "elektronika",
"miqdor": 100,
"tavsif": "Samsung HD-Line"
},
{
"id": 2,
"nomi": "Hurmo",
"narx": 15000,
"kategoriya": "Oziq-ovqat",
"miqdor": 150,
"tavsif": "Hom hali yetilmagan"
},
{
"id": 3,
"nomi": "Koditsioner",
"narx": 5500000,
"kategoriya": "elektronika",
"miqdor": 60,
"tavsif": "Samsung Fresh_Air"
},
{
"id": 4,
"nomi": "Kir-moshina",
"narx": 3500000,
"kategoriya": "elektronika",
"miqdor": 90,
"tavsif": "Samsung clear-tech"
},
{
"id": 5,
"nomi": "Palto",
"narx": 500000,
"kategoriya": "kiyim-kechak",
"miqdor": 0,
"tavsif": "Ayiq mp'ynasidan",
"n": 9000000
},
{
"id": 6,
"nomi": "Banan",
"narx": 50000,
"kategoriya": "Oziq-ovqat",
"miqdor": 50,
"tavsif": "Portugaliaya"
}
]

## Bitta mahsulotni olish

GET /api/mahsulotlar/6

{
"id": 6,
"nomi": "Banan",
"narx": 50000,
"kategoriya": "Oziq-ovqat",
"miqdor": 50,
"tavsif": "Portugaliaya"
}

## Yangi mahsulot qo‘shish

POST /api/mahsulotlar
{

"nomi": "Banan",
"narx": 50000,
"kategoriya": "Oziq-ovqat",
"miqdor": 50,
"tavsif": "Portugaliaya"
}

## Response:

{
"message": "mahsulot muvaffaqiyatli qo'shildi"
}

## mahsulotni yangilash

# PUT /api/mahsulotlar/1

{

"nomi": "Palto",
"narx": 500000,
"kategoriya": "kiyim-kechak",
"miqdor": 0,
"tavsif": "Ayiq mp'ynasidan",
"n": 9000000
}

## mahsulotni o‘chirish

# DELETE /api/mahsulotlar/1

{
"message": "mahsulot o'chirildi"
}

# Qo‘shimcha route’lar

# KAtegoriya bo‘yicha filtrlash

GET /api/mahsulotlar?kategoriya=elektronika

# NArx oralig'i bo‘yicha filtrlash

GET /api/mahsulotlar?minNarx=1000&maxNarx=5000

# Omborda tugagan mahsulotlar:

GET /api/mahsulotlar/tugagan

# Eng qimmat 5 ta mahsulot:

GET /api/mahsulotlar/eng-qimmat

## mahsulot statusini o‘zgartirish

# PATCH /api/mahsulotlar/1/status

{
"kategoriya": "kiyim-kechak"
}

## Validatsiya qoidalari

Nomi kamida 3 ta belgidan iborat bo'lishi kerak
Narx 0 dan katta bo'lishi kerak
Miqdor 0 yoki undan katta bo'lishi kerak
Kategoriya ro'yxatdan birini tanlash

# Xato javobi:

{
"error": " Nomi kamida 3 ta belgidan iborat bo'lishi kerak
"
}

## HTTP Status kodlari

200 — muvaffaqiyatli so‘rov

201 — yaratildi

400 — noto‘g‘ri ma’lumot

404 — topilmadi

500 — server xatosi
