/*Validation funksiyasi */
export default function validateMaxsulot(data, isPatch = false) {
  if (!isPatch && (!data.nomi || data.nomi.length < 3))
    return "Nomi kamida 3 ta belgidan iborat bo'lishi kerak";

  if ("narx" in data && (typeof data.narx !== "number" || data.narx <= 0))
    return "Narx 0 dan katta bo'lishi kerak";

  if ("miqdor" in data && (typeof data.miqdor !== "number" || data.miqdor < 0))
    return "Miqdor 0 yoki undan katta bo'lishi kerak";

  if (!isPatch && !data.kategoriya) return "Kategoriya tanlanishi kerak";

  return null;
}
