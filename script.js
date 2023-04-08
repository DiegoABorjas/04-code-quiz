const main = document.getElementById('main-container');
const startButton = document.getElementById('begin-quiz');
const questionBox = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
var timeElement = document.getElementById('time')

// Initialize logic variables
var selectedAnswer = '';
var secondsLeft = 60;
var score = 0;

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

    // Creating buttons for quiz
    var choiceButtonOne = document.createElement("button");
    var choiceButtonTwo = document.createElement("button");
    var choiceButtonThree = document.createElement("button");
    var choiceButtonFour = document.createElement("button");

    // Remove start button when the quiz begins 
    startButton.style.display = 'none'

    // Loop through questions array
    for (var i=0; i<questionsArray.length; i++) {
        
        //If no time left end quiz
        if (secondsLeft <= 0) {
            console.log('Time is over!')
            return
        }

        // Show question to user
        questionBox.innerText = questionsArray[i].question

        // Assign choices to buttons and show them to user
        choiceButtonOne.textContent = questionsArray[i].options[0]
        optionsContainer.appendChild(choiceButtonOne)

        choiceButtonTwo.textContent = questionsArray[i].options[1]
        optionsContainer.appendChild(choiceButtonTwo)

        choiceButtonThree.textContent = questionsArray[i].options[2]
        optionsContainer.appendChild(choiceButtonThree)

        choiceButtonFour.textContent = questionsArray[i].options[3]
        optionsContainer.appendChild(choiceButtonFour)

        // When user selects option check answer & update score & time
        optionsContainer.addEventListener('click', function(event) {
            const isButton = event.target.nodeName === 'BUTTON';
            if (!isButton) return;

            console.log(event.target.textContent)

        })
        



        // If there's time left, show another set of questions.
        
        console.log(questionsArray[i])

    }

}

// Function tp set the timer
function setTime() {
    var timeInterval = setInterval(function() {
        secondsLeft--;
        timeElement.textContent = 'Time Left: ' + secondsLeft

        if (secondsLeft === 0) {
            clearInterval(timeInterval)
        }
    }, 1000)
}
// Function to check if answer is correct or not
function checkAnswer(selected, correct) {
    return selected === correct    
}