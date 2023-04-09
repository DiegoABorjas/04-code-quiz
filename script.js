const main = document.getElementById('main-container');
const startButton = document.getElementById('begin-quiz');
const questionBox = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
var timeElement = document.getElementById('time')

// Initialize logic variables
var currentQuestionIndex;
var secondsLeft = 60;
var score = 0;

// Array of questions
const questionsArray = [
    {
        id: 1,
        question: "Commmonly used Data Types DO NOT include:",
        options: ['Strings', 'Booleans', 'Alerts', 'Numbers'],
        answer: 'Alerts'
    },
    {
        id: 2,
        question: "The condition inside an if / else statement is enclosed within? :",
        options: ['Quotes', 'Curly Brackets', 'Square Brackets', 'Parenthesis'],
        answer: 'Parenthesis'
    },
    {
        id: 3,
        question: "Arrays in JavaScript can be used to store:",
        options: ['Numbers and Strings', 'Other Arrays', 'Booleans', 'All of the above'],
        answer: 'All of the above'
    },
];

// Function to begin the Quiz.
function beginQuiz() {

    // Start timer
    setTime();
    // Remove start button when the quiz begins 
    startButton.style.display = 'none';
    // Set the initial question index of the questions array.
    currentQuestionIndex = 0
    // Begin showing questions
    setNextQuestion();

}

// Function to set the timer
function setTime() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timeElement.textContent = 'Time Left: ' + secondsLeft

        if (secondsLeft === 0) {
            clearInterval(timeInterval)
        }
    }, 1000)
}

//Function to show a question
function showQuestion(question) {
    // Show question title
    questionBox.innerText = question.question;

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option
        optionsContainer.appendChild(button)
    })
    // When user selects option check answer & update score & time
    optionsContainer.addEventListener('click', function(event) {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) return;

        console.log(checkAnswer(event.target.textContent, question.answer))
        console.log(currentQuestionIndex)
        if (currentQuestionIndex >= questionsArray.length) {
            console.log('NO MORE QUESTIONS')
            return
        }
        resetState();
        setNextQuestion();

    });
};

function setNextQuestion() {
    showQuestion(questionsArray[currentQuestionIndex])
    currentQuestionIndex++
}

function resetState() {
    var btns = document.querySelectorAll('button')
    for (button of btns) {
        button.remove();
    }


}



// Function to check if answer is correct or not
function checkAnswer(selected, correct) {
    return selected === correct    
}