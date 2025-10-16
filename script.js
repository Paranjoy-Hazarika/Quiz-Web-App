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

function questionManager(question, questionNumber) {
    question.textContent = `${questionNumber + 1}. ${quizInfo[questionNumber].question}`;

    optionContainer.forEach((optionElement, i) => {
        optionElement.textContent = `${i + 1}. ${quizInfo[questionNumber].options[i]}`;
    })
}

function checkAnswers(targetObject, userAnswer) {
    const correctAnswer = quizInfo[questionNumber].answer;
    optionContainer.forEach(opt => {
        opt.style.pointerEvents = "none";
    })

    if (userAnswer === correctAnswer) {
        score++;
        targetObject.classList.add("correct");
        return;
    }

    optionContainer.forEach(optionElement => {
        const optionText = optionElement.textContent.substring(optionElement.textContent.indexOf(' ') + 1);
        if (optionText != correctAnswer) {
            optionElement.classList.add("wrong")
        } else {
            optionElement.classList.add("correct");
        }
    })
}

function displayScore() {
    scoreContainer.textContent = `${score}/${quizLength}`;
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
const scoreContainer = document.querySelector(".scoreNum");

const quizLength = quizInfo.length;

let currentQuestionNumber = 1;
let questionNumber = 0;
let score = 0;

startQuizBtn.addEventListener("click", () => {
    nextBtn.classList.add("hideBtn");
    hiddenToggle(quizStartPage);
    hiddenToggle(quizSection);
    hiddenToggle(madeBy);
    
    questionManager(questionContainer, questionNumber);
})

nextBtn.addEventListener("click", () => {
    nextBtn.classList.add("hideBtn");

    optionContainer.forEach(opt => {
        opt.classList.remove("correct");
        opt.classList.remove("wrong");
        opt.style.pointerEvents = "all";
    })

    if (currentQuestionNumber < quizLength) {
        currentQuestionNumber++;
        questionNumber++;
        questionManager(questionContainer, questionNumber);
    } else {
        displayScore();

        hiddenToggle(quizSection)
        hiddenToggle(scoreSection);
        hiddenToggle(madeBy);
        console.log(score);
    }
})


restartBtn.addEventListener("click", () => {
    optionContainer.forEach(opt => {
        opt.classList.remove("correct");
        opt.classList.remove("wrong");
        opt.style.pointerEvents = "all";
    })

    currentQuestionNumber = 1;
    questionNumber = 0;
    score = 0;

    hiddenToggle(quizStartPage);
    hiddenToggle(scoreSection);
    nextBtn.classList.add("hideBtn");
})

optionContainer.forEach(optionElement => {
    optionElement.addEventListener('click', (e) => {
        nextBtn.classList.remove("hideBtn");

        const clickedObj = e.target;
        const clickedText = clickedObj.textContent.trim();
        const answerText = clickedText.substring(clickedText.indexOf(' ') + 1);
        console.log(answerText);

        checkAnswers(clickedObj, answerText);
    })
})