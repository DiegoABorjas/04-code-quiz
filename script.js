// DOM element variables

const main = document.getElementById('main-container');
const header = document.getElementById('header');
const startButton = document.getElementById('begin-quiz');
const questionBox = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const finalScoreP = document.createElement('p');
const initialsForm = document.createElement('form');
const submitForm = document.getElementById('submit-form');
const resultSection = document.getElementById('selection-result');
var timeElement = document.getElementById('time');
const highScoresList = document.createElement('ol');
const submitButton = document.createElement('button');
const formInput = document.createElement('input');



// Initialize logic variables
var currentQuestionIndex;
var secondsLeft = 50;
var score = 0;
var highScoresArray = [];

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
        secondsLeft = 0;
        return
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
        resultSection.textContent = 'Correct!'
    // If wrong option selected, decrease timer by 10 seconds
    } else {
        secondsLeft-=15
        console.log('ANSWER INCORRECT, NEW SCORE IS: ' + score)
        resultSection.textContent = 'Wrong!'
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
    // resultSection.textContent = ''
}

// Function to check if answer is correct or not
function checkAnswer(selected, correct) {
    return selected === correct    
}

// Function to show the final score 
function showFinalScore() {
    resetState();
    secondsLeft = 0;
    questionBox.innerText = 'All done!';
    finalScoreP.innerText = 'Your final score is: ' + score;
    optionsContainer.appendChild(finalScoreP);
    resultSection.textContent = ''
    showForm();
}

// Function to show the high scores form
function showForm() {
    const formLabel = document.createElement('label');
    formLabel.innerText = 'Enter initials:';
    submitButton.innerText = 'Submit';
    submitButton.setAttribute('class','submit-button');
    
    initialsForm.appendChild(formLabel);
    initialsForm.appendChild(formInput);
    initialsForm.appendChild(submitButton);
    submitForm.appendChild(initialsForm);
}

// Submit button event listener to save the score
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    var scoreText = formInput.value.trim() + ' - ' + score;

    if (scoreText === '') {
        return;
    }
    getScores();
    highScoresArray.push(scoreText);

    storeScores();
    viewHighScores();
})

// Function to store scores in localStorage
function storeScores() {
    // Stringify and set key in localStorage to scores array
    localStorage.setItem("scores", JSON.stringify(highScoresArray));
}

// Function to show the scores
function viewHighScores() {
    const goBack = document.createElement('button')
    const clearScores = document.createElement('button')
    getScores();
    resetState();
    header.style.visibility = 'hidden';
    questionBox.innerText = 'High Scores';
    finalScoreP.remove();
    initialsForm.remove();

    for (var i = 0; i < highScoresArray.length; i++) {
        var scoreEntry = highScoresArray[i];
        var li = document.createElement('li');
        li.textContent = scoreEntry;
        li.setAttribute('data-index', i);
        highScoresList.appendChild(li);
        optionsContainer.appendChild(highScoresList)
    }
    optionsContainer.appendChild(highScoresList)

    goBack.textContent = 'Go Back'
    clearScores.textContent = 'Clear Scores'
    submitForm.appendChild(goBack);
    submitForm.appendChild(clearScores);
    

    goBack.addEventListener('click', refreshPage)
    clearScores.addEventListener('click', handleClearScores)

}

// Function to get the scores
function getScores() {
    // Get stored scores from localStorage
    var storedScores = JSON.parse(localStorage.getItem("scores"));
  
    // If scores were retrieved from localStorage, update the scores array to it
    if (storedScores !== null) {
      highScoresArray = storedScores;
    }
  }

// Function to reload page
function refreshPage() {
    location.reload();
}

// Function to clear high scores
function handleClearScores() {
    localStorage.clear();
    highScoresList.remove();
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