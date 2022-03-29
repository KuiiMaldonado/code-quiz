//Top right countdown timer
var timer = document.getElementById('timer');
var startQuizButton = document.getElementById('startQuiz');

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