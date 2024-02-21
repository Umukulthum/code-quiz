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
  timerId = setInterval(function () {
    // show starting time
    timer.textContent--;

    if (timer.textContent < 1) {
      //Stop timer
      clearInterval(timerId);
      quizEnd();
    }

  }, 1000);


  // call a function to show the next question
  getQuestion();
}

function getQuestion() {
  let currentQuestion;
  // get current question object from array
  if (questions[currentQuestionIndex] !== undefined) {
    currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    question.textContent = currentQuestion.title;

    // clear out any old question choices
    //choicesEl.removeChild(choicesEl.firstElementChild);
    choicesEl.innerHTML = '';
    // loop over the choices for current question
    let numberOfChoices = currentQuestion.choices.length;
    let olEl = document.createElement("ol");

    for (let i = 0; i < numberOfChoices; i++) {
      let choice = currentQuestion.choices[i];

      // create a new button for each choice 
      let liEl = document.createElement("li");
      let buttonEl = document.createElement("button");

      //Set the label and value for the button
      buttonEl.innerText = choice;
      buttonEl.setAttribute("value", choice);

      //Append button to list and list to ordered list
      liEl.appendChild(buttonEl);
      olEl.appendChild(liEl);

      // display the choice button on the page
      choicesEl.appendChild(olEl);
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
    timer.textContent = (timer.textContent - 15) > 0 ? timer.textContent - 15 : 0;

    // if they run out of time (i.e., time is less than zero) set time to zero so we can end quiz


    // display new time on page

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
  feedbackEl.removeAttribute("class");
  feedbackEl.setAttribute("class", "feedback");

  // after one second, remove the "feedback" class from the feedback element
  setTimeout(function () {
    feedbackEl.setAttribute("class", "hide");
  }, 500);
  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  // if the time is less than zero and we have reached the end of the questions array,
  // call a function that ends the quiz (quizEnd function)
  // or else get the next question
  if (currentQuestionIndex < questions.length && timer.textContent > 0)
  {
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
  document.getElementById("end-screen").removeAttribute("class");

  // show final score
  document.getElementById("final-score").textContent = timer.textContent;

  // hide the "questions" section
  questionsEl.setAttribute("class", "hide");
}

// add the code in this function to update the time, it should be called every second
function clockTick() {
  // right here - update time

  // update the element to display the new time value

  // check if user ran out of time; if so, call the quizEnd() function

}

// complete the steps to save the high score
function saveHighScore() {
  let scoreStr;

  // get the value of the initials input box
  let inputtedInitials = initialsEl.value;
  // make sure the value of the initials input box wasn't empty
  if (!inputtedInitials) {
    alert("Kindly input your initials");
    return false;
  }

  // if it is not, check and see if there is a value of high scores in local storage
  let highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  highscores.push({ initials: inputtedInitials, score: timer.textContent });

    // convert the array to a piece of text
    scoreStr = JSON.stringify(highscores);
    // store the high score in local storage
    localStorage.setItem("highscores", scoreStr);



  // // if there isn't any, then create a new array to store the high score
  // if (highscores.length < 1) {
  //   // add the new initials and high score to the array
  //   highscores.push({ initials: inputtedInitials, score: timer });

  //   // convert the array to a piece of text
  //   scoreStr = JSON.stringify(highscores);
  //   // store the high score in local storage
  //   localStorage.setItem("highscores", scoreStr);
  // }

  // // otherwise, if there are high scores stored in local storage,
  // else {
  //   // retrieve the local storage value that has the high scores,
  //   // convert it back to an array,
  //   // add the new initials and high score to the array,
  //   // then convert the array back to a piece of text,
  //   // then store the new array (converted to text) back in local storage
  // }


  // finally, redirect the user to the high scores page.
  location.replace("/highscores.html");

}

// use this function when the user presses the "enter" key when submitting high score initials
function checkForEnter(event) {
  // if the user presses the enter key, then call the saveHighscore function
  if (event.key === "Enter"){
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
