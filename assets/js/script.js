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
var questionDiv = document.getElementById('question')

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

//Event listener for startQuiz button
startQuizButton.addEventListener('click', countdown);