const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");

checkBtn.addEventListener("click", function () {
  const number = userInput.value.trim();

  if (number === "") {
    alert("Please provide a phone number");
    return;
  }

  const validPattern = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;

  if (validPattern.test(number)) {
    result.textContent = "Valid US number: " + number;
  } else {
    result.textContent = "Invalid US number: " + number;
  }
});

clearBtn.addEventListener("click", function () {
  result.textContent = "";
});
