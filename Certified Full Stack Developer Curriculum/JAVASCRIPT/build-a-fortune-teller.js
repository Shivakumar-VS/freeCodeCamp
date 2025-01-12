let fortune1 = "Your cat will look very cuddly today.";
let fortune2 = "The weather will be nice tomorrow.";
let fortune3 = "Be cautious of your new neighbours.";
let fortune4 = "You will find a new hobby soon.";
let fortune5 = "It would be wise to avoid the colour red today.";
const randomNumber = Math.floor(Math.random() * 5) + 1;
let selectedFortune;
if (randomNumber === 1) {
  selectedFortune = fortune1;
} else if (randomNumber === 2) {
  selectedFortune = fortune2;
} else if (randomNumber === 3) {
  selectedFortune = fortune3;
} else if (randomNumber === 4) {
  selectedFortune = fortune4;
} else if (randomNumber === 5) {
  selectedFortune = fortune5;
}
console.log(selectedFortune);