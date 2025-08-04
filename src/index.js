const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#startGame');
// TODO: Add the missing query selectors:
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');  

let lastHole;
let points = 0; // Global variable to keep track of the score 
let time = 0; // Global variable to keep track of the time
let timer; // Global variable to keep track of the timer
let difficulty = "normal"; // Default difficulty level


/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value");
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; // Generate a random integer between min and max
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500; // 1.5 seconds
  } else if (difficulty === "normal") {
    return 1000; // 1 second
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200); // Random integer between 600 and 1200 milliseconds
  } else {
    throw new Error("Invalid difficulty level");
  }
}

/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */


function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  } else {
    lastHole = hole;
    return hole;
  } 
}

/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/

function gameOver() {
  if (time > 0) {
    const timeoutId = showUp(); // Call showUp() to continue the game
    return timeoutId; // Return the timeout ID for the next mole appearance
  } else {
    const gameStopped = stopGame(); // Stop the game if time is up
    return gameStopped; // Return the string "game stopped"
  } 
}
/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  const delay = setDelay(difficulty); // Get the delay based on the difficulty
  const hole = chooseHole(holes); // Choose a random hole
  const timeoutID = showAndHide(hole, delay); // Call showAndHide with the chosen hole and delay
  return timeoutID; // Return the timeout ID for further use  
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay){
  toggleVisibility(hole);
  // TODO: call the toggleVisibility function so that it adds the 'show' class.
  
  const timeoutID = setTimeout(() => {
    // TODO: Call the toggleVisibility() function so that it removes the show class when the timer times out.
    toggleVisibility(hole); // Hide the mole after the delay
    gameOver(); // Check if the game should continue or stop  
}, delay);
  return timeoutID;
}

/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/





function toggleVisibility(hole){
  hole.classList.toggle('show'); // Toggle the 'show' class on the hole
  return hole; // Return the hole 
}

/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  // TODO: Write your code here
   points += 1;
   score.textContent = points; // Update the scoreboard with the new score
   return points; 
}

/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/

function clearScore() {
  // TODO: Write your code here
  points = 0; // Reset points to 0
  score.textContent = points; // Update the scoreboard to reflect the cleared score
  return points;  
}

/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  if (time > 0) {
    time--; // Decrement the time by 1 second
    timerDisplay.textContent = time; // Update the timer display
  } else {
    timerDisplay.textContent = "0"; // Set timer display to 0 when time is up
    gameOver(); // Call gameOver to handle the end of the game
  }
  return time;  
}

/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  timer = setInterval(updateTimer, 1000); // Start the timer that calls updateTimer every second
  return timer; // Return the timer ID for potential future use 
}

/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  const mole = event.target; // Get the mole that was clicked
  if (mole.classList.contains('mole')) { // Check if the mole is visible
    updateScore(); // Update the score if the mole is visible
    toggleVisibility(mole); // Hide the mole after it has been whacked
  } else {
    console.log("Missed!"); // Optional: log a message if the mole was not visible
  }
  return 1; // Return the mole that was clicked  
}

/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(){
  const moles = document.querySelectorAll('.mole'); // Select all mole elements

    moles.forEach(mole => { // Loop through each mole
        mole.addEventListener('click', whack); // Add click event listener, calling the whack function
    });
  return moles; // Return the list of moles with event listeners added  
}

/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration; // Set the game duration in seconds
  timerDisplay.textContent = time; // Update the timer display with the initial time
  return time; // Return the set duration for potential future use
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  clearInterval(timer); // Clear the timer to stop the game
  timerDisplay.textContent = "0"; // Reset the timer display to 0
  return "game stopped"; // Return a message indicating the game has stopped
}

/**
* This function starts the game when the `startButton` is clicked and initializes the game by performing the following steps: 

 * 1. Clears the score using `clearScore()`. 

 * 2. Sets the game duration using `setDuration()`. 

 * 3. Sets up event listeners on the moles using `setEventListeners()`.

 * 4. Starts the game timer by calling `startTimer()`.  

 * 5. Begins the game loop by calling `showUp()` to display moles. 


 * Note: Simply uncommenting `setDuration(10);` and `showUp();` is not enough. To make the game work, ensure all necessary functions listed above are called to initialize the score, timer, event listeners, and mole appearances. 
*/
function startGame(){
  clearScore(); // Clear the score at the start of the game
  setDuration(10); // Set the game duration to 10 seconds
  setEventListeners(); // Set up event listeners for moles
  startTimer(); // Start the game timer
  showUp(); // Begin the game loop by showing moles
}

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
