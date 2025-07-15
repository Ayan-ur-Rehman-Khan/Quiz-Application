const questions = [
  {
    question: "Which of the following best describes a pure function in JavaScript?",
    options: [
      "A function that modifies global state",
      "A function that logs to the console",
      "A function that returns the same output for the same input without side effects",
      "A function that changes its input parameters"
    ],
    correctAnswer: "A function that returns the same output for the same input without side effects"
  },
  {
    question: "What is the difference between == and === in JavaScript?",
    options: [
      "They are identical",
      "== checks type and value, === checks only value",
      "== checks only value, === checks value and type",
      "== is used for assignment, === is used for comparison"
    ],
    correctAnswer: "== checks only value, === checks value and type"
  },
  {
    question: "What will be the result of this function call: parseInt('10.5')?",
    options: ["10.5", "11", "10", "NaN"],
    correctAnswer: "10"
  },
  {
    question: "How does JavaScript handle variable scope within functions?",
    options: [
      "All variables are global",
      "Variables declared inside functions are function-scoped",
      "Variables declared with var inside functions are block-scoped",
      "Functions cannot contain scoped variables"
    ],
    correctAnswer: "Variables declared inside functions are function-scoped"
  },
  {
    question: "Which logical operator returns true only if both operands are true?",
    options: ["||", "&&", "!=", "!"],
    correctAnswer: "&&"
  },
  {
    question: "What does the typeof operator return for an array?",
    options: ["object", "array", "list", "undefined"],
    correctAnswer: "object"
  },
  {
    question: "What will this expression return: Boolean('false')?",
    options: ["false", "true", "undefined", "null"],
    correctAnswer: "true"
  },
  {
    question: "Which of the following values is NOT considered falsy in JavaScript?",
    options: ["0", "\"\"", "null", "[]"],
    correctAnswer: "[]"
  },
  {
    question: "What is the result of: typeof function(){}?",
    options: ["object", "function", "undefined", "method"],
    correctAnswer: "function"
  },
  {
    question: "Which statement best explains the purpose of a return statement in a function?",
    options: [
      "It ends the function and sends a value back to the caller",
      "It pauses the function",
      "It logs output to the console",
      "It initializes variables"
    ],
    correctAnswer: "It ends the function and sends a value back to the caller"
  },
  {
    question: "How can you ensure a block of code runs only if two conditions are both true?",
    options: [
      "Using the || operator",
      "Using two if statements",
      "Using the && operator",
      "Using an else-if block"
    ],
    correctAnswer: "Using the && operator"
  },
  {
    question: "What will be the output of: console.log(typeof NaN);",
    options: ["number", "NaN", "undefined", "object"],
    correctAnswer: "number"
  },
  {
    question: "Which keyword is used to prevent code from executing if a condition is false?",
    options: ["break", "else", "continue", "if"],
    correctAnswer: "if"
  },
  {
    question: "Which statement correctly checks if a variable 'a' is NOT equal to 'b'?",
    options: ["a != b", "a !== b", "a =! b", "Both A and B"],
    correctAnswer: "Both A and B"
  },
  {
    question: "What happens when you compare null === undefined?",
    options: ["true", "false", "TypeError", "NaN"],
    correctAnswer: "false"
  }
];




let currentQuestion = 0;
let score = 0;
let userAnswer = null;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const nextQuestionButton = document.getElementById("nextBtn");
const finishQuizButton = document.getElementById("finishQuiz");
const quizContainer = document.getElementById("quiz-container");
const restartQuizButton = document.getElementById("restartQuiz");
const resultContainer = document.getElementById("result-container");

function showQuestions() {
    const q = questions[currentQuestion];
    questionElement.innerHTML = q.question;
    optionsElement.innerHTML = '';

    q.options.forEach(option => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.innerHTML = option;
        optionDiv.addEventListener("click", saveAnswer);
        optionsElement.appendChild(optionDiv);
    });
    questionElement.classList.add("fade-in");
    setTimeout(() => questionElement.classList.remove("fade-in"), 500);

}

function saveAnswer(event) {
    userAnswer = event.target.innerHTML;
    nextQuestionButton.disabled = false;

    document.querySelectorAll(".option").forEach(opt => {
        opt.classList.remove("active");
    });
    event.target.classList.add("active");
}

function incrementQuestion() {
    if (userAnswer == questions[currentQuestion].correctAnswer) {
        score += 10;
    }

    currentQuestion++;
    document.getElementById("quizScore").textContent = score;
    document.getElementById("finalScore").textContent = score;
    userAnswer = null;

    if (currentQuestion >= questions.length - 1) {
        nextQuestionButton.style.display = "none";
        finishQuizButton.style.display = "inline-block";
    }

    if (currentQuestion < questions.length) {
        showQuestions();
        nextQuestionButton.disabled = true;
    }
}

function finishQuiz() {

    resultContainer.classList.add("slide-in");

    if (userAnswer == questions[currentQuestion].correctAnswer) {
        score += 10;
    }

    document.getElementById("quizScore").textContent = score;
    document.getElementById("finalScore").textContent = score;

    const ratingMessage = document.getElementById("ratingMessage");

    if (score >= 90) {
        ratingMessage.textContent = "🌟 Excellent! Genius!";
    } else if (score >= 70) {
        ratingMessage.textContent = "👍 Good Job!";
    } else if (score >= 50) {
        ratingMessage.textContent = "🙂 Not bad, keep trying.";
    } else if (score >= 30) {
        ratingMessage.textContent = "😐 You can do better.";
    } else {
        ratingMessage.textContent = "😓 Try again!";
    }

    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    const scoreEl = document.getElementById("quizScore");
    scoreEl.classList.add("bounce");
    setTimeout(() => scoreEl.classList.remove("bounce"), 300);

}


function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestions();
}





function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswer = null;

    document.getElementById("quizScore").textContent = score;
    document.getElementById("finalScore").textContent = score;
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    finishQuizButton.style.display = "none";
    nextQuestionButton.style.display = "inline-block";
    nextQuestionButton.disabled = true;

    showQuestions();
}

showQuestions();
