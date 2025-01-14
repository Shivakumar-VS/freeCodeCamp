const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
  diceValuesArr = [];

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  };

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;

  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

const getHighestDuplicates = (arr) => {
  const counts = {};

  for (const num of arr) {
    if (counts[num]) {
      counts[num]++;
    } else {
      counts[num] = 1;
    }
  }

  let highestCount = 0;

  for (const num of arr) {
    const count = counts[num];
    if (count >= 3 && count > highestCount) {
      highestCount = count;
    }
    if (count >= 4 && count > highestCount) {
      highestCount = count;
    }
  }

  const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

  if (highestCount >= 4) {
    updateRadioOption(1, sumOfAllDice);
  }

  if (highestCount >= 3) {
    updateRadioOption(0, sumOfAllDice);
  }

  updateRadioOption(5, 0);
};

const detectFullHouse = (arr) => {
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  const hasThreeOfAKind = Object.values(counts).includes(3);
  const hasPair = Object.values(counts).includes(2);

  if (hasThreeOfAKind && hasPair) {
    updateRadioOption(2, 25);
  }

  updateRadioOption(5, 0);
};

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });

  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

const resetGame = () => {
  diceValuesArr = [0, 0, 0, 0, 0];
  score = 0;
  round = 1;
  rolls = 0;

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });

  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = "";

  rollsElement.textContent = rolls;
  roundElement.textContent = round;

  resetRadioOptions();
};


const checkForStraights = (arr) => {
  // Remove duplicates and sort the array
  const sortedUniqueDice = [...new Set(arr)].sort((a, b) => a - b);

  // Check for a large straight (1-2-3-4-5 or 2-3-4-5-6)
  const largeStraight1 = [1, 2, 3, 4, 5];
  const largeStraight2 = [2, 3, 4, 5, 6];

  if (
    JSON.stringify(sortedUniqueDice) === JSON.stringify(largeStraight1) ||
    JSON.stringify(sortedUniqueDice) === JSON.stringify(largeStraight2)
  ) {
    updateRadioOption(4, 40); // Enable the fifth radio button for a large straight
    scoreSpans[4].textContent = ", score = 40"; // Update text for large straight
    updateRadioOption(3, 30); // Enable the fourth radio button for a small straight
    scoreSpans[3].textContent = ", score = 30"; // Update text for small straight
    return;
  }

  // Check for a small straight (any 4 consecutive numbers)
  for (let i = 0; i <= sortedUniqueDice.length - 4; i++) {
    const isSmallStraight =
      sortedUniqueDice[i + 3] - sortedUniqueDice[i] === 3 &&
      sortedUniqueDice.slice(i, i + 4).every(
        (val, idx, arr) => !idx || val - arr[idx - 1] === 1
      );

    if (isSmallStraight) {
      updateRadioOption(3, 30); // Enable the fourth radio button for a small straight
      scoreSpans[3].textContent = ", score = 30"; // Update text for small straight
      return;
    }
  }

  // No straight found, update the last radio button with 0
  updateRadioOption(5, 0);
  scoreSpans[5].textContent = ", score = 0"; // Update text for no straight
};

let array = [1,5,4,3,5,3];
let array2 = [1,2,4,3,6,3];


checkForStraights(array);
checkForStraights(array2);

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);

  }
});


rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.");
  } else {
    rolls++; // Increment the roll count
    resetRadioOptions(); // Reset radio options before new roll
    rollDice(); // Generate new dice values
    updateStats(); // Update displayed stats (rolls, round)
    getHighestDuplicates(diceValuesArr); // Check for duplicates
    detectFullHouse(diceValuesArr); // Check for full house
    checkForStraights(diceValuesArr); // Check for straights
  }
});
keepScoreBtn.addEventListener("click", () => {
  let selectedValue;
  let achieved;

  for (const radioButton of scoreInputs) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;
    }
  }

  if (selectedValue) {
    rolls = 0;
    round++;
    updateStats();
    resetRadioOptions();
    updateScore(selectedValue, achieved);
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert("Please select an option or roll the dice");
  }
});


