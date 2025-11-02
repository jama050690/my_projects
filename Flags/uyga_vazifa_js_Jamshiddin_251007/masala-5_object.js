const prompt = require("prompt-sync")();
// Masala_5:
// Bir talabaning ma'lumotlarini saqlash uchun JavaScript obyekti tuzing. Obyekt mana shu xususiyatlarga ega bo'lsin
// ism (string)
// yosh (number)
// fakultet (string)
// kurs (number)
// Baholar (object, kamida 3 ta fanning baholarini o'z ichiga olsin)

// Bu objectga  grant nomli yangi xususiyat qo'shing va uning qiymatini true yoki false deb belgilang.
// Bu objectga talabaning eng yuqori ballini chiqarib beruvchi funksiya qo’shing.
// Bu objectga talabaning o’rtacha smestr baholarini hisoblab beruvchi funksiya qo’shing.

const talaba = {
  ism: "Jamshiddin",
  yosh: 35,
  fakultet: "Tarix",
  kurs: 4,
  baholar: {
    tarix: 86,
    inglizTili: 80,
    informatika: 90,
    grant: true,
  },
  engYuqoriBall() {
    const ball = Object.values(this.baholar);
    return Math.max(...ball);
  },
  ortachaBall() {
    const ball = Object.values(this.baholar).filter(
      (v) => typeof v === "number"
    );
    const jami = ball.reduce((c, b) => b + c, 1);
    return (jami / ball.length).toFixed(2);
  },
};
console.log(
  `Talaba: ${talaba.ism}, ${talaba.yosh} yoshda, ${talaba.fakultet} fakulteti, ${talaba.kurs}-kurs`
);
console.log(
  `Baholar: Tarix - ${talaba.baholar.tarix}, Ingliz tili - ${talaba.baholar.inglizTili}, Informatika - ${talaba.baholar.informatika}`
);
console.log(`Eng yuqori ball: ${talaba.engYuqoriBall()}`);
console.log(`O'rtacha baho: ${talaba.ortachaBall()}`);
