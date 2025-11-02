const prompt = require("prompt-sync")();

// 2-masala.
//  calculator obyektini yarating, unda:
// add(a, b) → qo‘shish
// sub(a, b) → ayirish
// mul(a, b) → ko‘paytirish
// div(a, b) → bo‘lish          metodlari bo‘lsin.

const calculator = {
  add(a, b) {
    return a + b;
  },

  sub(a, b) {
    return a - b;
  },

  mul(a, b) {
    return a + b;
  },

  adiv(a, b) {
    return a + b;
  },
};
let result = calculator.add(5, 6);
console.log(result);
