const prompt = require("prompt-sync")();
// 1-masala.
//  user obyektini yarating: {name: "Ali", age: 20, isStudent: true}
//  getInfo() metodi- foydalanuvchi haqida matn qaytarsin: "Ali 20 yoshda. Talaba: true"

const user = {
  name: `Ali`,
  age: 35,
  isStudent: false,
  getInfo() {
    return `Mening ismim ${this.name}, men ${this.age} yoshdaman. Talaba emasman: ${this.isStudent}`;
  },
};
let result = user.getInfo();
console.log(result);
