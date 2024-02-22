# code-quiz
Code Quiz Project developed with Javascript 


## Description
In this project, Javascript is used to build a timed coding quiz with multiple-choice questions. This web application runs in the browser and features dynamically updated HTML and CSS. It has a clean, polished, and responsive user interface. 

## Implementation
1. The quiz implementation begins by initializing variables to track the quiz state and reference different DOM elements on the HTML page. Subsequently, a series of functions are created to perform various tasks related to the project.

2. The `startQuiz` function is linked to the start button and is invoked when the user clicks on it to commence the code quiz.

3.  Following this, a timer is set to 75 (calculated as the total number of questions in the quiz multiplied by 15) and begins counting down using the `setInterval` method.

4. Next, a function is developed to display questions and options retrieved from a predefined array of objects containing question details.

5. Once the question and options are presented, the user can click on an option. 
If the user selects the correct option, a sound is played, and the feedback "Correct" is displayed briefly for half a second using the `setTimeout` method. Subsequently, the next question (if available) is presented. 
In case of an incorrect option selection, a different sound is played, the feedback "Wrong" is displayed for half a second, and 15 seconds are deducted from the timer (if more than 15 seconds remain). The next question is then presented, if available and if there is still time.

6. The cycle in (5) above continues until the user completes the quiz or the timer reaches zero.

7. Upon completion, the user is presented with a view displaying the final score (representing the number of seconds left) and an input box to enter their initials. 

8. After input and submission, or upon pressing the Enter key, the user's initials and score are saved to the browser's local storage using the `localStorage.setItem` method.

9. Subsequently, the user is redirected to a page containing a list of high scores retrieved from the browser's local storage using the `localStorage.getItem` method. These scores are sorted in descending order based on the scores.

10. There's also a button on the highscores page that deletes all the highscore entry from the browser's local storage. This was achieved using the `localStorage.removeItem` method.


## Mock-Up
The screen shot below demonstrates the application functionality:

![A user clicks through an interactive coding quiz, then enters initials to save the high score before resetting and starting over.][page-1]


## Live
[Click here](https://umukulthum.github.io/code-quiz) for the deployed url 


## Repository
[Click here](https://github.com/Umukulthum/code-quiz) for the project's GitHub repository


[page-1]: assets/images/04-web-apis-homework-demo.gif





