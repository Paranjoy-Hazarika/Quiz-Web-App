const quizInfo = [
    {
        question : "This is question 1?",
        options : ["Option 1", "Option 2", "Option 3", "Option 4"],
        answer : "Option 1"
    },
    {
        question : "This is question 2?",
        options : ["Option A", "Option B", "Option C", "Option D"],
        answer : "Option A"
    },
    {
        question : "This is question 3?",
        options : ["Option V", "Option X", "Option Y", "Option Z"],
        answer : "Option Y"
    },
    {
        question : "This is question 4?",
        options : ["Option i", "Option ii", "Option iii", "Option iv"],
        answer : "Option ii"
    }
]

function hiddenToggle(element) {
    element.classList.toggle("hidden");
}

function questionManager(question, options, questionNumber) {
    let optionNumber = 0;
    let option = 0;

    question.textContent = quizInfo[questionNumber].question;
    while (optionNumber < 4) {
        options[optionNumber].textContent = quizInfo[questionNumber].options[option];

        optionNumber++;
        option = option + 1;
    }
}

const startQuizBtn = document.querySelector('.quizStart');
const nextBtn = document.querySelector(".nextButton")
const restartBtn = document.querySelector(".restartButton")

const quizStartPage = document.querySelector(".quizPage");
const quizSection = document.querySelector(".quizSection");
const scoreSection = document.querySelector(".resultSection");
const madeBy = document.querySelector(".madeBy");

const questionContainer = document.querySelector(".question");
const optionContainer = document.querySelectorAll(".option");

const quizLength = quizInfo.length;

let currentQuestionNumber = 1;
let questionNumber = 0;

startQuizBtn.addEventListener("click", () => {
    hiddenToggle(quizStartPage);
    hiddenToggle(quizSection);
    hiddenToggle(madeBy);
    
    questionManager(questionContainer, optionContainer, questionNumber);
})


nextBtn.addEventListener("click", () => {
        currentQuestionNumber++;

        if (currentQuestionNumber <= quizLength) {
            questionNumber++;
            questionManager(questionContainer, optionContainer, questionNumber);
        } else {
            hiddenToggle(quizSection)
            hiddenToggle(scoreSection);
    }
})

restartBtn.addEventListener("click", () => {
    currentQuestionNumber = 1;
    questionNumber = 0;

    hiddenToggle(quizStartPage);
    hiddenToggle(scoreSection);
    hiddenToggle(madeBy);
})