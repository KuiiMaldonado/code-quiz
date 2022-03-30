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
var timer = document.getElementById('timer');
var startQuizButton = document.getElementById('startQuiz');

//Function that will trigger the timer
function countdown() {
    var timeLeft = 75;
    cleanQuestionContainer();

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

//Function to render the questions
function renderQuestion(event) {
    let element = event.target;
    let questionContainer = document.getElementById('question-container');

    if (element.matches('#startQuiz')) {
        cleanQuestionContainer();
        let questionText = document.createElement('h4');
        let answersList = document.createElement('ol');
        questionText.textContent = questions[0].question;
        questionContainer.appendChild(questionText);
        questionContainer.appendChild(answersList);
        for (var i = 0; i < 4; i++) {
            let liElement = document.createElement('li');
            liElement.textContent = questions[0].options[i];
            answersList.appendChild(liElement);
        }
    }
}

//Event listener for startQuiz button
startQuizButton.addEventListener('click', renderQuestion);