// add variables that keep track of the quiz "state"
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// add variables to reference DOM elements
// example is below
let startEl = document.getElementById("start-screen");
let questionsEl = document.getElementById('questions');
let timer = document.getElementById("time");

let question = document.getElementById("question-title");
let choicesEl = document.getElementById("choices");
let feedbackEl = document.getElementById("feedback");
let endEl = document.getElementById("end-screen");
let finalScoreEl = document.getElementById("final-score");

let startBtn = document.getElementById("start");
let submitBtn = document.getElementById("submit");
let initialsEl = document.getElementById("initials");


// reference the sound effects
let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');

function startQuiz() {
  // hide start screen
  startEl.setAttribute("class", "hide");

  // un-hide questions section
  questionsEl.removeAttribute("class");

  // start timer
  timer.textContent = time;
  timerId = setInterval(clockTick, 1000);

  // call a function to show the next question
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  if (questions[currentQuestionIndex] !== undefined) {
    let currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    question.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = '';

    // loop over the choices for current question
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      let choice = currentQuestion.choices[i];

      // create a new button for each choice 
      let buttonEl = document.createElement("button");

      //Set the label and value for the button
      buttonEl.innerText = `${i + 1}. ${choice}`;
      buttonEl.setAttribute("value", choice);

      // display the choice button on the page
      choicesEl.appendChild(buttonEl);
    }
  }
}

function questionClick(event) {
  // identify the targeted button that was clicked on
  let selected = event.target.value;

  // if the clicked element is not a choice button, do nothing.
  if (!selected) { return; }

  // check if user guessed wrong
  if (selected !== questions[currentQuestionIndex].answer) {
    // if they got the answer wrong, penalize time by subtracting 15 seconds from the timer
    // recall the timer is the score they get at the end
    // if they run out of time (i.e., time is less than zero) set time to zero so we can end quiz
    // display new time on page
    timer.textContent = (timer.textContent - 15) > 0 ? timer.textContent - 15 : 0;

    // play "wrong" sound effect
    sfxWrong.play();

    // display "wrong" feedback on page
    feedbackEl.textContent = "Wrong!";

  } else {
    // play "right" sound effect
    sfxRight.play();

    // display "right" feedback on page by displaying the text "Correct!" in the feedback element
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  // set the feedback element to have the class of "feedback"
  feedbackEl.setAttribute("class", "feedback");

  // after one second, remove the "feedback" class from the feedback element
  setTimeout(function () {
    feedbackEl.setAttribute("class", "hide");
  }, 500);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  // if we haven't reached the end of the questions array and the time is greater than zero,
  // get the next question
  // or else call a function that ends the quiz (quizEnd function)
  if (currentQuestionIndex < questions.length && timer.textContent > 0) {
    getQuestion();
  }
  else {
    quizEnd();
  }
}

// define the steps of the QuizEnd function...when the quiz ends...
function quizEnd() {
  // stop the timer
  clearInterval(timerId);

  // show end screen
  endEl.removeAttribute("class");

  // show final score
  finalScoreEl.textContent = timer.textContent;

  // hide the "questions" section
  questionsEl.setAttribute("class", "hide");
}

// add the code in this function to update the time, it should be called every second
function clockTick() {
  // update the element to display the new time value
  timer.textContent--;

  // check if user ran out of time; if so, call the quizEnd() function
  if (timer.textContent < 1) {
    //Stop timer
    clearInterval(timerId);
    quizEnd();
  }
}

// complete the steps to save the high score
function saveHighScore() {

  // get the value of the initials input box
  let inputtedInitials = initialsEl.value;

  // make sure the value of the initials input box wasn't empty
  if (!inputtedInitials) {
    alert("Kindly input your initials");
    return;
  }

  // if it is not, check and see if there is a value of high scores in local storage
  // if there isn't any, then create a new array to store the high score
  let highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

  // add the new initials and high score to the array
  highscores.push({ initials: inputtedInitials, score: timer.textContent });

  // convert the array to a piece of text
  let scoreStr = JSON.stringify(highscores);

  // store the high score in local storage
  localStorage.setItem("highscores", scoreStr);

  // finally, redirect the user to the high scores page.
  location.replace("highscores.html");

}

// use this function when the user presses the "enter" key when submitting high score initials
function checkForEnter(event) {
  // if the user presses the enter key, then call the saveHighscore function
  if (event.key === "Enter") {
    saveHighScore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighScore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on an element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
