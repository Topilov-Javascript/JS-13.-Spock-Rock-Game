const playerScoreEl = document.getElementById('playerScore')
const playerChoiceEl = document.getElementById('playerChoice')
const computerScoreEl = document.getElementById('computerScore')
const computerChoiceEl = document.getElementById('computerChoice')
const resultText = document.getElementById('resultText')

const playerRock = document.getElementById('playerRock')
const playerPaper = document.getElementById('playerPaper')
const playerScissors = document.getElementById('playerScissors')
const playerLizard = document.getElementById('playerLizard')
const playerSpock = document.getElementById('playerSpock')

const computerRock = document.getElementById('computerRock')
const computerPaper = document.getElementById('computerPaper')
const computerScissors = document.getElementById('computerScissors')
const computerLizard = document.getElementById('computerLizard')
const computerSpock = document.getElementById('computerSpock')

const allGameIcons = document.querySelectorAll('.far')

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] }
}

let playerScoreNumber = 0
let computerScoreNumber = 0
let computerChoice = ''

// Reset Score & playerChoice/computerChoice
function resetAll () {
  streamingConfetti ? stopConfetti() : false
  playerScoreNumber = 0
  playerScoreEl.textContent = playerScoreNumber
  computerScoreNumber = 0
  computerScoreEl.textContent = computerScoreNumber
  playerChoiceEl.textContent = ''
  computerChoiceEl.textContent = ''
  resultText.textContent = ''
  resetSelected()
}

// Reset all 'selected' icons
function resetSelected () {
  allGameIcons.forEach(icon => {
    icon.classList.remove('selected')
  })
}

// Random Computer Choice
function computerRandomChoice () {
  computerChoice = Object.keys(choices)[Math.floor(Math.random() * 5)]
}

// Add 'selected' styling and update computer choice
function displayComputerChoice () {
  eval(`computer${capitalize(computerChoice)}`).classList.add('selected')
  computerChoiceEl.textContent = ` --- ${capitalize(computerChoice)}`
}

// Check results, increase scores, update resultText
function updateScore (playerChoice) {
  /* playerChoice = 'rock'
  computerChoice = 'lizard' */
  if (playerChoice === computerChoice) {
    streamingConfetti ? stopConfetti() : false
    resultText.textContent = "It's a tie."
  } else {
    const choice = choices[playerChoice]
    if (choice.defeats.includes(computerChoice)) {
      streamingConfetti ? stopConfetti() : false
      startConfetti()
      resultText.textContent = 'You Won!'
      playerScoreNumber++
      playerScoreEl.textContent = playerScoreNumber
    } else {
      streamingConfetti ? stopConfetti() : false
      resultText.textContent = 'You Lost!'
      computerScoreNumber++
      computerScoreEl.textContent = computerScoreNumber
    }
  }
}

// Call functions to process turn
function checkResult (playerChoice) {
  resetSelected()
  computerRandomChoice()
  displayComputerChoice()
  updateScore(playerChoice)
}

// Capitalize first letter
const capitalize = s => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Passing player selection value and styling icons
function select (playerChoice) {
  checkResult(playerChoice)
  // Add 'selected' styling and update player choice
  eval(`player${capitalize(playerChoice)}`).classList.add('selected')
  playerChoiceEl.textContent = ` --- ${capitalize(playerChoice)}`
}

// On Startup set initial values
resetAll()
