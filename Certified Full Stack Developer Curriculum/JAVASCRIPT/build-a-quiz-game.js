// Create the questions array
const questions = [
    {
      category: "Science",
      question: "What is the chemical symbol for water?",
      choices: ["H2O", "CO2", "O2"],
      answer: "H2O",
    },
    {
      category: "History",
      question: "Who was the first President of the United States?",
      choices: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"],
      answer: "George Washington",
    },
    {
      category: "Geography",
      question: "What is the capital of France?",
      choices: ["Paris", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      category: "Math",
      question: "What is 5 multiplied by 6?",
      choices: ["30", "25", "35"],
      answer: "30",
    },
    {
      category: "Literature",
      question: "Who wrote 'Romeo and Juliet'?",
      choices: ["William Shakespeare", "Charles Dickens", "Jane Austen"],
      answer: "William Shakespeare",
    },
  ];
  
  // Function to get a random question
  function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }
  
  // Function to get a random computer choice
  function getRandomComputerChoice(choices) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  
  // Function to get the result
  function getResults(selectedQuestion, computerChoice) {
    if (computerChoice === selectedQuestion.answer) {
      return "The computer's choice is correct!";
    } else {
      return `The computer's choice is wrong. The correct answer is: ${selectedQuestion.answer}`;
    }
  }
  