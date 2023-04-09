const main = document.getElementById('main-container');
const startButton = document.getElementById('begin-quiz');
const questionBox = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
var timeElement = document.getElementById('time')

// Initialize logic variables
var currentQuestionIndex;
var secondsLeft = 20;
var score = 0;

// Array of questions
const questionsArray = [
    {
        question: "Commmonly used Data Types DO NOT include",
        options: ['Strings', 'Booleans', 'Alerts', 'Numbers'],
        answer: 'Alerts'
    },
    {
        question: "The condition inside an if / else statement is enclosed within?",
        options: ['Quotes', 'Curly Brackets', 'Square Brackets', 'Parenthesis'],
        answer: 'Parenthesis'
    },
    {
        question: "Arrays in JavaScript can be used to store",
        options: ['Numbers and Strings', 'Other Arrays', 'Booleans', 'All of the above'],
        answer: 'All of the above'
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables",
        options: ['Commas', 'Curly Brackets', 'Quotes', 'Parenthesis'],
        answer: 'Quotes'
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ['JavaScript', 'Terminal/Bash', 'For Loops', 'console.log'],
        answer: 'console.log'
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

// Function to set the next question
function setNextQuestion() {
    showQuestion(questionsArray[currentQuestionIndex])
}

//Function to show a question
function showQuestion(question) {
    // IF no more questions end quiz
    if (currentQuestionIndex >= questionsArray.length) {
        return showFinalScore();
    }
    // Show question title
    questionBox.innerText = question.question;
    // Show each option as a button
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option
        optionsContainer.appendChild(button)
    });
};

// Event listener for when user selects an option button
optionsContainer.addEventListener('click', function(event) {
    // If the user clicks on NOT a button, do nothing
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) return;
    // When option selected, check if it's correct
    var result = (checkAnswer(event.target.textContent, questionsArray[currentQuestionIndex].answer))
    // If correct option selected, add points to score
    if (result) {
        score += 10;
        console.log('ANSWER CORRECT, NEW SCORE IS: ' + score)
    // If wrong option selected, decrease timer by 10 seconds
    } else {
        secondsLeft-=10
        console.log('ANSWER INCORRECT, NEW SCORE IS: ' + score)
    } 
    // After option selected reset the options container, increment the question index
    // & then set the next question
    resetState();
    currentQuestionIndex++;
    return setNextQuestion();
});

// Function to reset question container
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

// Show final score:
function showFinalScore() {
    resetState();
    console.log('End of Quiz reached');
    questionBox.innerText = 'All done!';
    const finalScoreP = document.createElement("p");
    finalScoreP.innerText = 'Your final score is: ' + score;
    optionsContainer.appendChild(finalScoreP);
}

// Function to set the timer
function setTime() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        if (secondsLeft < 0) {
            secondsLeft = 0
        }
        timeElement.textContent = 'Time Left: ' + secondsLeft

        if (secondsLeft <= 0) {
            clearInterval(timeInterval)
            return showFinalScore();    
        }
    }, 1000)
}