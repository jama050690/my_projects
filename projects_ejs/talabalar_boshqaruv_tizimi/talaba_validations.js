export function validateTalaba(data) {
  // Validation berish
  const { ism, familiya, yosh, kurs, ball } = data;

  if (!ism || !familiya) {
    return "Ism va familiya majburiy";
  }

  if (yosh < 16 || yosh > 30) {
    return "Yosh 16-30 oralig'ida bo'lishi kerak";
  }

  if (kurs < 1 || kurs > 4) {
    return "Kurs 1-4 oralig'ida bo'lishi kerak";
  }

  if (ball < 0 || ball > 100) {
    return "Ball 0-100 oralig'ida bo'lishi kerak";
  }

  return null;
}
