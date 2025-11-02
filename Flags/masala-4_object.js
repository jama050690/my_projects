const prompt = require("prompt-sync")();
// masala_4:
// Shunday funksiya yarating 10 gacha bo’lgan sonlar kopaytmasini chiqarsin .
//  Funksiya argument qabul qilsin.

const arifmetic = {
  oshuvchi(x) {
    let natija = 1;
    for (let i = 1; i <= x; i++) {
      natija *= i;
    }
    return natija;
  },
};
let result = arifmetic.oshuvchi(10);
console.log(result);
