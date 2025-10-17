let quizInfo = [];
let questionNumber = 0;
let score = 0;
let quizLength;

fetch("./data.json")
    .then(response => {
        
        if (!response.ok) {
            throw new Error();
        }

        return response.json();
    })
    .then(data => {
        quizInfo = data;
        quizLength = quizInfo.length;
        setupInit();
    })

    .catch(error => {
        console.error("Error loading the quiz: ", error);
        alert("Failed to load the quiz data. Please refresh the page");
    })

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
        if (optionText !== correctAnswer) {
            optionElement.classList.add("wrong");
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

function setupInit() {
    startQuizBtn.addEventListener('click', startBtnLogic);
    nextBtn.addEventListener('click', nextBtnLogic);
    restartBtn.addEventListener('click', restartBtnLogic);
}

function startBtnLogic() {
    nextBtn.classList.add("hideBtn");
    hiddenToggle(quizStartPage);
    hiddenToggle(quizSection);
    hiddenToggle(madeBy);
    
    questionManager(questionContainer, questionNumber);
}

function nextBtnLogic() {
    nextBtn.classList.add("hideBtn");

    optionContainer.forEach(opt => {
        opt.classList.remove("correct");
        opt.classList.remove("wrong");
        opt.style.pointerEvents = "all";
    })

    if (questionNumber < quizLength - 1) {
        questionNumber++;
        questionManager(questionContainer, questionNumber);
    } else {
        displayScore();

        hiddenToggle(quizSection)
        hiddenToggle(scoreSection);
        hiddenToggle(madeBy);
        console.log(score);
    }
}


function restartBtnLogic() {
    optionContainer.forEach(opt => {
        opt.classList.remove("correct");
        opt.classList.remove("wrong");
        opt.style.pointerEvents = "all";
    })

    questionNumber = 0;
    score = 0;

    hiddenToggle(quizStartPage);
    hiddenToggle(scoreSection);
    nextBtn.classList.add("hideBtn");
}

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