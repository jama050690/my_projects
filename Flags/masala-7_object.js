const prompt = require("prompt-sync")();
// Masala_7:
// Bir avtomobilning texnik xususiyatlarini ifodalovchi ichki obyektlarga
// ega bo'lgan obyekt tuzing. avtomobil nomli obyekt yarating.								avtomobil obyektiga quyidagi xususiyatlarni qo'shing:
// marka (string)
// model (string)
// yil (number)
// texnik_holati (ichki obyekt):
// dvigatel_hajmi (number)
// ot_kuchi (number)
// rang (string)
// avtomobil obyektidagi texnik_holati ichki obyektining rangini
// "qora" deb o'zgartiring.

const avtomobil = {
  marka: "BMW",
  model: "X5",
  yil: 2020,
  texnik_holati: {
    dvigatel_hajmi: 3.0,
    ot_kuchi: 250,
    rang: "oq",
  },
};
avtomobil.texnik_holati.rang = "qora";
console.log("Avtomobil ma'lumotlari:");
console.log(`Marka: ${avtomobil.marka}`);
console.log(`Model: ${avtomobil.model}`);
console.log(`Yil: ${avtomobil.yil}`);
console.log("Texnik holat:");
console.log(`Dvigatel hajmi: ${avtomobil.texnik_holati.dvigatel_hajmi} L`);
console.log(`Ot kuchi: ${avtomobil.texnik_holati.ot_kuchi} HP`);
console.log(`Rang: ${avtomobil.texnik_holati.rang}`);
