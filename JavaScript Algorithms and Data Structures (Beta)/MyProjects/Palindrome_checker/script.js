document.addEventListener("DOMContentLoaded", function() {
    const checkButton = document.getElementById("check-btn");
    const enterInput = document.getElementById("text-input");
    const result = document.getElementById("result");

    // Function to remove non-alphanumeric characters and convert to lowercase
    const removeNonAlphaNumeric = (text) => {
        return text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    };

    // Function to check for palindrome
    const checkPalindrome = (inputText) => {
        const cleanedInput = removeNonAlphaNumeric(inputText);
        const reversedInput = cleanedInput.split('').reverse().join('');
        return cleanedInput === reversedInput;
    };

    checkButton.addEventListener("click", function() {
        const userInput = enterInput.value.trim();
        
        if (userInput.length === 0) {
            alert("Please input a value");
            return;
        }

        const isPalindrome = checkPalindrome(userInput);
        
        if (isPalindrome) {
            result.innerHTML = `<span class="highlight">${userInput}</span> is a palindrome`;
        } else {
            result.innerHTML = `<span class="highlight">${userInput}</span> is not a palindrome`;
        }
    });
});
