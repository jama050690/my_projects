const prompt = require("prompt-sync")();

// 3-masala.
//  car obyektini yarating:
//  {brand: "Chevrolet", model: "Cobalt", year: 2022}
// getAge(currentYear) metodi → mashinaning necha yoshda ekanini qaytarsin.

const car = {
  brand: "chevrolet",
  model: "Cobalt",
  year: 2002,

  getAge() {
    let date = new Date();
    return date.getFullYear() - this.year;
  },
};
let result = car.getAge();
console.log(result);
