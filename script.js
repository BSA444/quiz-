/* =====================================
   QUIZ MASTER - JAVASCRIPT
===================================== */

// GET HTML ELEMENTS

const loader = document.getElementById("loader");
const welcomePopup = document.getElementById("welcome-popup");
const enterBtn = document.getElementById("enter-btn");

const homeSection = document.getElementById("home-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const usernameInput = document.getElementById("username");
const categorySelect = document.getElementById("category");
const startBtn = document.getElementById("start-btn");

const questionForm = document.getElementById("question-form");
const addCategory = document.getElementById("add-category");
const newQuestion = document.getElementById("new-question");

const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");

const correctAnswer = document.getElementById("correct-answer");
const saveStatus = document.getElementById("save-status");
const questionCount = document.getElementById("question-count");

const questionNumber = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

const resultName = document.getElementById("result-name");
const scoreElement = document.getElementById("score");
const percentageElement = document.getElementById("percentage");
const reviewContainer = document.getElementById("review-container");
const restartBtn = document.getElementById("restart-btn");


// DEFAULT QUESTIONS

const defaultQuestions = {

    gk: [
        {
            question: "What is the capital of India?",
            options: ["Mumbai", "New Delhi", "Chennai", "Hyderabad"],
            answer: 1
        },
        {
            question: "Who is known as the Father of the Nation in India?",
            options: ["Jawaharlal Nehru", "Subhash Chandra Bose", "Mahatma Gandhi", "B. R. Ambedkar"],
            answer: 2
        },
        {
            question: "Which is the largest planet in our Solar System?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: 2
        },
        {
            question: "What is the national animal of India?",
            options: ["Lion", "Tiger", "Elephant", "Leopard"],
            answer: 1
        },
        {
            question: "Which is the longest river in India?",
            options: ["Yamuna", "Godavari", "Ganga", "Krishna"],
            answer: 2
        }
    ],

    computer: [
        {
            question: "What does CPU stand for?",
            options: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Control Processing User"
            ],
            answer: 0
        },
        {
            question: "Which device is used to input text?",
            options: ["Monitor", "Keyboard", "Speaker", "Printer"],
            answer: 1
        },
        {
            question: "Which one is an operating system?",
            options: ["Google", "Windows", "HTML", "Python"],
            answer: 1
        },
        {
            question: "What does RAM stand for?",
            options: [
                "Read Access Memory",
                "Random Access Memory",
                "Run Access Module",
                "Read Active Machine"
            ],
            answer: 1
        },
        {
            question: "Which device displays computer output?",
            options: ["Mouse", "Keyboard", "Monitor", "Scanner"],
            answer: 2
        }
    ],

    javascript: [
        {
            question: "Which keyword declares a variable in JavaScript?",
            options: ["style", "let", "body", "html"],
            answer: 1
        },
        {
            question: "Which symbol is used for comments in JavaScript?",
            options: ["//", "##", "<!--", "**"],
            answer: 0
        },
        {
            question: "Which method prints output in the console?",
            options: [
                "document.write()",
                "console.log()",
                "print.text()",
                "output()"
            ],
            answer: 1
        },
        {
            question: "Which data type represents true or false?",
            options: ["String", "Number", "Boolean", "Object"],
            answer: 2
        },
        {
            question: "Which method adds an item to the end of an array?",
            options: ["push()", "pop()", "shift()", "join()"],
            answer: 0
        }
    ],

    aptitude: [
        {
            question: "What is 10 + 20?",
            options: ["20", "30", "40", "50"],
            answer: 1
        },
        {
            question: "What is 25% of 200?",
            options: ["25", "40", "50", "75"],
            answer: 2
        },
        {
            question: "Find the next number: 2, 4, 6, 8, ?",
            options: ["9", "10", "12", "14"],
            answer: 1
        },
        {
            question: "What is 12 × 5?",
            options: ["50", "55", "60", "65"],
            answer: 2
        },
        {
            question: "If one pen costs ₹10, what is the cost of 5 pens?",
            options: ["₹30", "₹40", "₹50", "₹60"],
            answer: 2
        }
    ]

};


// LOAD QUESTIONS FROM LOCAL STORAGE

let questions = {};

function loadQuestions() {

    const savedQuestions = localStorage.getItem("quizMasterQuestions");

    if (savedQuestions) {
        try {
            questions = JSON.parse(savedQuestions);

            // Add missing categories if needed
            Object.keys(defaultQuestions).forEach(category => {
                if (!Array.isArray(questions[category])) {
                    questions[category] = [...defaultQuestions[category]];
                }
            });

        } catch (error) {
            questions = JSON.parse(JSON.stringify(defaultQuestions));
        }

    } else {
        questions = JSON.parse(JSON.stringify(defaultQuestions));
    }

    saveQuestions();
}


// SAVE QUESTIONS

function saveQuestions() {
    localStorage.setItem(
        "quizMasterQuestions",
        JSON.stringify(questions)
    );
}


// SHOW QUESTION COUNTS

function updateQuestionCount() {

    const total =
        Object.values(questions).reduce(
            (sum, categoryQuestions) => sum + categoryQuestions.length,
            0
        );

    questionCount.textContent =
        `Total Questions: ${total} | GK: ${questions.gk.length} | Computer: ${questions.computer.length} | JavaScript: ${questions.javascript.length} | Aptitude: ${questions.aptitude.length}`;
}


// LOADING SCREEN

window.addEventListener("load", () => {

    loadQuestions();
    updateQuestionCount();

    setTimeout(() => {
        loader.classList.add("hidden");
        welcomePopup.classList.remove("hidden");
    }, 1200);

});


// WELCOME BUTTON

enterBtn.addEventListener("click", () => {
    welcomePopup.classList.add("hidden");
});


// ADD NEW QUESTION

questionForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const selectedCategory = addCategory.value;
    const question = newQuestion.value.trim();

    const options = [
        option1.value.trim(),
        option2.value.trim(),
        option3.value.trim(),
        option4.value.trim()
    ];

    const answer = Number(correctAnswer.value);

    if (!selectedCategory || !question || options.some(option => !option)) {
        saveStatus.textContent = "Please fill all fields.";
        return;
    }

    if (!Number.isInteger(answer) || answer < 0 || answer > 3) {
        saveStatus.textContent = "Please select the correct answer.";
        return;
    }

    const newQuestionObject = {
        question: question,
        options: options,
        answer: answer
    };

    questions[selectedCategory].push(newQuestionObject);

    saveQuestions();
    updateQuestionCount();

    questionForm.reset();

    saveStatus.textContent = "Question added successfully!";

});


// QUIZ VARIABLES

let currentQuestions = [];
let currentCategory = "";
let currentIndex = 0;
let selectedAnswers = [];
let currentUser = "Student";
let score = 0;

let timer = 30;
let timerInterval = null;


// START QUIZ

startBtn.addEventListener("click", startQuiz);

function startQuiz() {

    currentUser = usernameInput.value.trim() || "Student";
    currentCategory = categorySelect.value;

    if (!currentCategory) {
        alert("Please select a quiz topic.");
        return;
    }

    currentQuestions = [...questions[currentCategory]];

    if (currentQuestions.length === 0) {
        alert("No questions available in this topic. Please add questions first.");
        return;
    }

    currentIndex = 0;

    selectedAnswers = new Array(currentQuestions.length).fill(null);

    homeSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");

    showQuestion();

}


// SHOW QUESTION

function showQuestion() {

    clearInterval(timerInterval);

    const current = currentQuestions[currentIndex];

    questionNumber.textContent =
        `Question ${currentIndex + 1} of ${currentQuestions.length}`;

    questionText.textContent = current.question;

    progressBar.style.width =
        `${((currentIndex + 1) / currentQuestions.length) * 100}%`;

    optionsContainer.innerHTML = "";

    current.options.forEach((option, index) => {

        const optionDiv = document.createElement("div");

        optionDiv.className = "option";
        optionDiv.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        if (selectedAnswers[currentIndex] === index) {
            optionDiv.classList.add("selected");
        }

        optionDiv.addEventListener("click", () => {
            selectAnswer(index);
        });

        optionsContainer.appendChild(optionDiv);

    });

    previousBtn.disabled = currentIndex === 0;

    nextBtn.disabled =
        currentIndex === currentQuestions.length - 1;

    startTimer();

}


// SELECT ANSWER

function selectAnswer(answerIndex) {

    selectedAnswers[currentIndex] = answerIndex;

    const allOptions =
        optionsContainer.querySelectorAll(".option");

    allOptions.forEach((option, index) => {

        option.classList.remove("selected");

        if (index === answerIndex) {
            option.classList.add("selected");
        }

    });

}


// TIMER

function startTimer() {

    timer = 30;
    timerElement.textContent = timer;

    timerInterval = setInterval(() => {

        timer--;

        timerElement.textContent = timer;

        if (timer <= 0) {

            clearInterval(timerInterval);

            if (currentIndex < currentQuestions.length - 1) {
                currentIndex++;
                showQuestion();
            } else {
                finishQuiz();
            }

        }

    }, 1000);

}


// PREVIOUS BUTTON

previousBtn.addEventListener("click", () => {

    if (currentIndex > 0) {
        currentIndex--;
        showQuestion();
    }

});


// NEXT BUTTON

nextBtn.addEventListener("click", () => {

    if (currentIndex < currentQuestions.length - 1) {
        currentIndex++;
        showQuestion();
    }

});


// SUBMIT QUIZ

submitBtn.addEventListener("click", () => {

    const confirmSubmit = confirm(
        "Are you sure you want to submit the quiz?"
    );

    if (confirmSubmit) {
        finishQuiz();
    }

});


// FINISH QUIZ

function finishQuiz() {

    clearInterval(timerInterval);

    score = 0;

    currentQuestions.forEach((question, index) => {

        if (selectedAnswers[index] === question.answer) {
            score++;
        }

    });

    const total = currentQuestions.length;

    const percentage = Math.round((score / total) * 100);

    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    resultName.textContent = `Well Done, ${currentUser}!`;

    scoreElement.textContent = `${score} / ${total}`;

    percentageElement.textContent = `${percentage}%`;

    showReview();

}


// ANSWER REVIEW

function showReview() {

    reviewContainer.innerHTML = "";

    currentQuestions.forEach((question, index) => {

        const reviewItem = document.createElement("div");

        reviewItem.className = "review-item";

        const userAnswer =
            selectedAnswers[index] === null
                ? "Not Answered"
                : question.options[selectedAnswers[index]];

        const correct =
            question.options[question.answer];

        const isCorrect =
            selectedAnswers[index] === question.answer;

        const heading = document.createElement("h3");
        heading.textContent =
            `${index + 1}. ${question.question}`;

        const yourAnswer = document.createElement("p");
        yourAnswer.textContent = `Your Answer: ${userAnswer}`;

        yourAnswer.className =
            isCorrect ? "correct-answer" : "wrong-answer";

        const correctAnswerText = document.createElement("p");
        correctAnswerText.textContent =
            `Correct Answer: ${correct}`;

        correctAnswerText.className = "correct-answer";

        const status = document.createElement("p");
        status.textContent =
            isCorrect ? "Correct!" : "Incorrect";

        status.className =
            isCorrect ? "correct-answer" : "wrong-answer";

        reviewItem.appendChild(heading);
        reviewItem.appendChild(yourAnswer);
        reviewItem.appendChild(correctAnswerText);
        reviewItem.appendChild(status);

        reviewContainer.appendChild(reviewItem);

    });

}


// RESTART QUIZ

restartBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    resultSection.classList.add("hidden");
    quizSection.classList.add("hidden");
    homeSection.classList.remove("hidden");

    updateQuestionCount();

});