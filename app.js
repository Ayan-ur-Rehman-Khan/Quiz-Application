const questions = [
    {
        id: 1,
        question: "What is the capital of Pakistan?",
        options: ["Karachi", "Lahore", "Islamabad", "Multan"],
        correctAnswer: "Islamabad"
    },
    {
        id: 2,
        question: "Which animal is known as the king of the jungle?",
        options: ["Tiger", "Lion", "Elephant", "Leopard"],
        correctAnswer: "Lion"
    },
    {
        id: 3,
        question: "How many days are there in a week?",
        options: [5, 6, 7, 8],
        correctAnswer: 7
    },
    {
        id: 4,
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Jupiter", "Earth", "Venus"],
        correctAnswer: "Mars"
    },
    {
        id: 5,
        question: "What is the national language of Pakistan?",
        options: ["Urdu", "Punjabi", "Sindhi", "English"],
        correctAnswer: "Urdu"
    },
    {
        id: 6,
        question: "What color do you get when you mix red and yellow?",
        options: ["Green", "Orange", "Purple", "Blue"],
        correctAnswer: "Orange"
    },
    {
        id: 7,
        question: "How many legs does a spider have?",
        options: [6, 8, 10, 12],
        correctAnswer: 8
    },
    {
        id: 8,
        question: "Which fruit is yellow and long?",
        options: ["Mango", "Banana", "Apple", "Grapes"],
        correctAnswer: "Banana"
    },
    {
        id: 9,
        question: "What do we use to write on a blackboard?",
        options: ["Pen", "Marker", "Chalk", "Pencil"],
        correctAnswer: "Chalk"
    },
    {
        id: 10,
        question: "What is H2O commonly known as?",
        options: ["Salt", "Water", "Sugar", "Oxygen"],
        correctAnswer: "Water"
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
