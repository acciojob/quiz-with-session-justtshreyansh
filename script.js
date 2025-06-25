// Questions array
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

// DOM elements
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Restore progress from sessionStorage or initialize empty
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Render quiz questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const questionBlock = document.createElement("div");
    questionBlock.className = "question-block";

    const questionText = document.createElement("p");
    questionText.textContent = q.question; // No numbering to pass Cypress tests
    questionBlock.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      label.style.display = "block";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore previous answer if selected
      if (userAnswers[i] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // Required for Cypress to detect
      }

      // Save answer to sessionStorage when selected
      input.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionBlock.appendChild(label);
    });

    questionsElement.appendChild(questionBlock);
  });
}

// Calculate score
function calculateScore() {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });
  return score;
}

// On submit
submitButton.addEventListener("click", () => {
  const score = calculateScore();
  localStorage.setItem("score", score);
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
});

// Initial render
renderQuestions();

// Show score if already stored
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}
