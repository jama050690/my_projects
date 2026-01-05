# Todo List API — Topshiriq

Ushbu loyiha Node.js yordamida yozilgan **Todo List CRUD API** bo‘lib,  
kitoblarni yaratish, ko‘rish, yangilash, o‘chirish va filtrlash imkonini beradi.  
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

### kitob modeli

## Har bir kitob quyidagi maydonlarga ega:

id — avtomatik yaratiladi
nom —
muallif —
janr—
nashrYili — 1880-2024 yilgacha
holat — (mavjud,olinga)
olgOdam — agar olingan bo'lsa

### API Endpoint’lar

## barcha kitoblarni olish

GET /api/kitoblar

## Response:

[
{
"id": 2,
"nomi": "Mexrobdan chayon",
"muallif": "Abdulla Qodiriy",
"janr": "roman",
"nashrYili": 1930,
"sahifalar": 320,
"holat": "olingan",
"olgOdam": ""
},
{
"id": 3,
"nomi": "Mexrobdan chayon",
"muallif": "Abdulla Qodiriy",
"janr": "roman",
"nashrYili": 1930,
"sahifalar": 320,
"holat": "olingan",
"olgOdam": "Bekzod"
}
]

## Bitta kitobnini olish

GET /api/kitoblar/3

{
"id": 3,
"nomi": "Mexrobdan chayon",
"muallif": "Abdulla Qodiriy",
"janr": "roman",
"nashrYili": 1930,
"sahifalar": 320,
"holat": "olingan",
"olgOdam": "Bekzod"
}

## Yangi kitob qo‘shish

POST /api/kitoblar
{

    "nomi": "Mexrobdan chayon",
    "muallif": "Abdulla Qodiriy",
    "janr": "roman",
    "nashrYili": 1930,
    "sahifalar": 320,
    "holat": "olingan",
    "olgOdam": "Bekzod"

}

## Response:

{
"message": "Kitob muvaffaqiyatli qo'shildi"
}

## kitobni yangilash

# PUT /api/kitoblar/1

{

    "nomi": "Otamdan qolgan dalalar",
    "muallif": "Tog'ay Murod",
    "janr": "roman",
    "nashrYili": 1994,
    "sahifalar": 277,
    "holat": "olingan",
    "olgOdam": "Dilshod"

}

## kitobni o‘chirish

# DELETE /api/kitoblar/1

{
"message": "kitob o'chirildi"
}

# Qo‘shimcha route’lar

# Janr bo'yicha filtrlash:

GET /api/kitoblar?janr=roman

# Muallif bo'yicha qidirish:

GET /api/kitoblar?muallif=Abdulla%20Qodiriy

# Mavjud kitoblar:

Get /api/kitoblar/mavjud

# Olingan kitoblar:

Get /api/kitoblar/olingan

# Kitob olish:

POST /api/kitoblar/:id/ol

# Kitob qaytarish:

POST /api/kitoblar/:id/qaytarish

## Validatsiya qoidalari

Nomi va muallif bo'sh bo'lmasligi kerak
Nashr yili 1800-2024 oralig'ida bo'lishi kerak
Sahifalar 1 dan katta bo'lishi kerak

# Xato javobi:

{
"error": "Nashr yili 1800-2024 oralig'ida bo'lishi kerak"
}

## HTTP Status kodlari

200 — muvaffaqiyatli so‘rov

201 — yaratildi

400 — noto‘g‘ri ma’lumot

404 — topilmadi

500 — server xatosi
