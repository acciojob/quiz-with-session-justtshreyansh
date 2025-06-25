// Questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Select elements
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Load saved answers or start fresh
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Render Questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    const questionBlock = document.createElement("div");
    questionBlock.className = "question-block";

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${q.question}`;
    questionBlock.appendChild(questionText);

    for (let j = 0; j < q.choices.length; j++) {
      const choice = q.choices[j];

      const label = document.createElement("label");
      label.style.display = "block";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore previous answer if it exists
      if (userAnswers[i] === choice) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionBlock.appendChild(label);
    }

    questionsElement.appendChild(questionBlock);
  }
}

// Calculate score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  return score;
}

// Show final score on click
submitButton.addEventListener("click", () => {
  const score = calculateScore();
  localStorage.setItem("score", score);
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
});

// Render on load
renderQuestions();

// Show saved score if exists
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
