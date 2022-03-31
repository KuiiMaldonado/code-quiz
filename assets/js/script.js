//Array with questions
const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        options: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 3
    },
    {
        question: 'The condition in and if / else statement is enclosed within ________.',
        options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        answer: 3
    },
    {
        question: 'Arrays in JavaScript can be used to store ______.',
        options: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 4
    },
    {
        question: 'String values must be enclosed within _______ when being assigned to variables.',
        options: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        answer: 3
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        options: ['JavaScript', 'termina/bash', 'for loops', 'console.log'],
        answer: 4
    }
];

const timer = document.getElementById('timer');
const viewHighscores = document.getElementById('highscores-button');
const questionContainer = document.getElementById('question-container');
const scoreContainer = document.getElementById('score-container');
const submit = document.getElementById('submit');
var activeQuestion = undefined;
var timeInterval;
var timeLeft;

//Function that will trigger the timer
function countdown() {

    timeLeft = 75;
    timeInterval = setInterval(function () {

        timeLeft--;
        timer.textContent = 'Time: ' + timeLeft;
        if (timeLeft < 0) {
            clearInterval(timeInterval);
        }

    }, 1000);
}

//Function that will "clean" the question-container
function cleanQuestionContainer() {
    questionContainer.innerHTML = '';
}

//Function that will create and append the question elements to the DOM
function createTemplateElements() {

    let questionText = document.createElement('h4');
    let answersList = document.createElement('ul');

    questionText.setAttribute('id', 'question-header');
    questionContainer.appendChild(questionText);
    questionContainer.appendChild(answersList);
    for (let i = 1; i <= 4; i++) {

        let liElement = document.createElement('li')
        let buttonElement = document.createElement('button');

        buttonElement.setAttribute('class', 'option-item');
        buttonElement.setAttribute('id', 'option_' + i);
        answersList.appendChild(liElement);
        liElement.appendChild(buttonElement);
    }
}

//Function to render highscores screen
function renderHighScores() {
    //If we click start quiz and then the view high scores button the timer will continue-
    //We clear the interval and set the time left back to zero.
    clearInterval(timeInterval);
    timeLeft = 0;
    timer.textContent = 'Time: ' + timeLeft;

    cleanQuestionContainer();
    questionContainer.setAttribute('class', "hidden");
    scoreContainer.classList.remove('hidden');

    let form = document.getElementById('form');
    form.remove();

    let header = document.getElementById('score-header');
    let text = document.getElementById('final-score');
    let player = localStorage.key(0);

    header.textContent = 'High Scores';
    text.textContent = '1. ' + player + '-' + localStorage.getItem(player);

    let backButton = document.createElement('button');
    let clearScores = document.createElement('button');
    backButton.setAttribute('id', 'back-button');
    clearScores.setAttribute('id', 'clear-scores');
    backButton.textContent = 'Back';
    clearScores.textContent = 'Clear scores';

    scoreContainer.appendChild(backButton);
    scoreContainer.appendChild(clearScores);
}

//Function render set initials screen
function renderInitials() {
    questionContainer.setAttribute('class', "hidden");
    scoreContainer.classList.remove('hidden');

    //We update the timer text here so it matches the actual score.
    timer.textContent = 'Time: ' + timeLeft;
    let finalScore = document.getElementById('final-score');
    finalScore.textContent = 'Your final score is ' + timeLeft;
}

//Function to render the questions
function renderQuestion() {

    let questionText = document.getElementById('question-header')
    questionText.textContent = questions[activeQuestion].question;

    for (let i = 1; i <= 4; i++) {

        let buttonElement = document.getElementById("option_" + i);
        buttonElement.textContent = i + '.' + questions[activeQuestion].options[i-1];
    }
}

function renderCorrectIncorrect(isCorrect) {
    let hr = document.createElement('hr');
    let span = document.createElement('span');

    if(isCorrect)
        span.textContent = 'Correct';
    else
        span.textContent = 'Wrong';

    questionContainer.appendChild(hr);
    questionContainer.appendChild(span);

    let timeout = setTimeout(function (){
        hr.remove();
        span.remove();
    }, 1000);
}

//Function to check if answers correct
function checkAnswer(option) {

    let number = option.charAt(option.length - 1);
    number = parseInt(number);

    if (questions[activeQuestion].answer === number)
        renderCorrectIncorrect(true);
    else {
        renderCorrectIncorrect(false);
        timeLeft -= 10;
    }
}

//Function to handle the clicks of the questionContainer
function questionContainerClickHandler(event) {

    let element = event.target;

    if (element.matches('#startQuiz')) {
        cleanQuestionContainer();
        activeQuestion = 0;
        createTemplateElements();
        countdown();
        renderQuestion();
    }
    else if (element.id.includes('option')){
        checkAnswer(element.id);
        activeQuestion++;
        if (activeQuestion < questions.length)
            renderQuestion();
        else {
            clearInterval(timeInterval);
            cleanQuestionContainer();
            renderInitials();
        }
    }
    else if (element.matches('#back-button')) {
        location.reload();
    }
    else if (element.matches('#clear-scores')) {
        localStorage.clear();
        let text = document.getElementById('final-score');
        text.remove();
    }
}

//Function to submit score
function submitScore(event) {

    event.preventDefault();
    let inputText = document.getElementById('initials');
    localStorage.setItem(inputText.value, timeLeft);
    renderHighScores();
}

//Event listeneres for clicks
questionContainer.addEventListener('click', questionContainerClickHandler);
submit.addEventListener('click', submitScore);
scoreContainer.addEventListener('click', questionContainerClickHandler)
viewHighscores.addEventListener('click', renderHighScores);