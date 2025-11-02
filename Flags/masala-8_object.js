const prompt = require("prompt-sync")();
// Masala_8:
// Cola objectining bonus() nomli methodi bolsin .
//  Sizda N ta butilkada Coca Cola bor, agar K ta
//  butilkani qaytib bersangiz sizga yana bitta yangi
//   Coca Cola berishadi. Siz shunday optimal strategiya
//   qilingki maximalta Coca Cola iching, shu maximal qancha
//   Coca Cola ichishingizni ayting!

let n = Number(prompt("Dastlabki Coca Cola butilkalar sonini kiriting (n): "));
let k = Number(prompt("Qaytariladigan butilkalar sonini kiriting (k): "));
const cola = {
  bonus: function (n, k) {
    let bottleCola = n;
    let newCola = n;
    while (newCola >= k) {
      let extraCola = Math.floor(newCola / k);
      bottleCola += extraCola;
      newCola = (newCola % k) + extraCola;
    }
    return bottleCola;
  },
};
const maxCola = cola.bonus(n, k);
console.log(`Siz maksimal ${maxCola} ta Coca Cola ichishingiz mumkin.`);
