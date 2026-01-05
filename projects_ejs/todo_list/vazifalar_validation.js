// /*Validation funksiyasi */

export default function validateTodo(data, isPatch = false) {
  //  Sarlavha
  if (!isPatch && (!data.sarlavha || data.sarlavha.trim().length < 6)) {
    return "Sarlavha bo'sh bo'lmasligi kerak";
  }

  // Status
  const allowedStatus = ["yangi", "jarayonda", "tugallangan"];
  if ("status" in data && !allowedStatus.includes(data.status)) {
    return "Status faqat belgilangan qiymatlardan biri bo'lishi kerak";
  }

  //  Muddat
  if ("muddat" in data) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(data.muddat);
    if (isNaN(deadline.getTime()) || deadline < today) {
      return "Muddat bugungi sanadan kichik bo'lmasligi kerak";
    }
  }

  return null;
}
