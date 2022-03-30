//Array with questions
const questions = [{
        question: 'Commonly used data types DO NOT include:',
        options: ['strings', 'booleans', 'alerts', 'numbers'],
        answer: 2
    },
    {
        question: 'The condition in and if / else statement is enclosed within ________.',
        options: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        answer: 2
    },
    {
        question: 'Arrays in JavaScript can be used to store ______.',
        options: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 3
    },
    {
        question: 'String values must be enclosed within _______ when being assigned to variables.',
        options: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
        answer: 2
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        options: ['JavaScript', 'termina/bash', 'for loops', 'console.log'],
        answer: 3
    }
];

//Top right countdown timer
const timer = document.getElementById('timer');
const questionContainer = document.getElementById('question-container');
var activeQuestion = undefined;

//Function that will trigger the timer
function countdown() {

    var timeLeft = 75;
    var timeInterval = setInterval(function () {

        timer.textContent = 'Time: ' + timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timeInterval);
        }

    }, 1000);
}

//Function that will "clean" the question-container
function cleanQuestionContainer() {

    let heading = document.getElementById('question-header')
    let intro = document.getElementById('question-p');
    let button = document.getElementById('startQuiz');

    heading.remove();
    intro.remove();
    button.remove();

}

//Function that will create and append the question elements to the DOM
function createQuestionElements() {

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

//Function to render the questions
function renderQuestion() {

    let questionText = document.getElementById('question-header')
    questionText.textContent = questions[activeQuestion].question;

    for (let i = 1; i <= 4; i++) {

        let buttonElement = document.getElementById("option_" + i);
        buttonElement.textContent = i + '.' + questions[activeQuestion].options[i-1];
    }
}

//Function to handle the clicks of the click
function clickHandler(event) {

    let element = event.target;

    if (element.matches('#startQuiz')) {
        cleanQuestionContainer();
        activeQuestion = 0;
        createQuestionElements();
        countdown();
        renderQuestion();
    }
    else {
        activeQuestion++;
        if (activeQuestion < questions.length)
            renderQuestion();
    }
}

//Event listener for startQuiz button
questionContainer.addEventListener('click', clickHandler);