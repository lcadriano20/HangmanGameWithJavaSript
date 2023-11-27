const keyboardDiv  = document.querySelector(".keyboard")
const hangmanImage = document.querySelector('.hangman-box img')
const hintSpace    = document.querySelector('.hint-text')
const wordDisplay  = document.querySelector('.word-display')
const guessesText  = document.querySelector('.guesses-text b')
const gameModal    = document.querySelector('.game-modal')
const playAgain    = document.querySelector('.play-again')
let gamingTime      = document.querySelector('.gamingTime')
let currentWord;
let wrongGuessCount = 0;
const maxGuesses = 6;
let correctLetters = []



function countdown(seconds) {
    let remainingTime = seconds;

    const intervalId = setInterval(function () {
        if (remainingTime <= 0) {
            clearInterval(intervalId);
           
        } else {
            remainingTime--;
        }
    }, 1000);
}

// Inicite a regressive count when the page load

function countdown(seconds, callback) {
    let remainingTime = seconds;

    const intervalId = setInterval(function () {
        if (remainingTime <= 0) {
            clearInterval(intervalId);
            callback(0); 
        } else {
            callback(remainingTime); 
            remainingTime--;
        }
        if(gameModal.classList.contains('show')) {
            clearInterval(intervalId);
        
        }
    }, 1000);
   
    gamingTime.innerHTML = seconds;
    gamingTime.classList.add('gamingTimeStyle')
}

function addSecondsOnHTML(seconds) {
    gamingTime.innerHTML = seconds;
    timeIsOver(seconds)
}


// Restart the Game 
function resetGame() {
    correctLetters = []
    hintSpace.innerHTML = ''
    wordDisplay.innerHTML = ''
    wrongGuessCount = 0
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("")
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll('button').forEach(btn=> {
        btn.disabled= false
    })
    gameModal.classList.remove('show')
    countdown(60, addSecondsOnHTML);
    


getRandomWord()
   

    


}
playAgain.addEventListener('click',resetGame)


//Show the hint on the page 
function showHint(hint) {
    const hintParagraph = document.createElement('p')
    hintParagraph.textContent = hint
    hintSpace.appendChild(hintParagraph)
    gameModal.classList.remove('show')
}


// Create a word list and show a random word and hint 
const getRandomWord = () => {

    // Selecting a random word and hint from the wordList
    const { word , hint } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word

    

    console.log(currentWord)

    showHint(hint)

    wordDisplay.innerHTML = word.split("").map(()=> `<li class="letter"></li>`).join("")
}
function addLetterToTheBoard(clickedLetter) {
    // Showing all the correct letters on the word display
    [...currentWord].forEach((letter,index)=>{
        if(letter===clickedLetter) {
            correctLetters.push(letter)

            wordDisplay.querySelectorAll("li")[index].innerText = letter
            wordDisplay.querySelectorAll("li")[index].classList.add('guessed')
        } 
    }) 
    if(correctLetters.length === currentWord.length) {

        gameOver(true)
      }
    
}  
function gameOver(isVictory) {
    setTimeout(() => {

        const modalText = isVictory ? `You found the word: ` : `The correct word was:`
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
        gameModal.classList.add('show')
    }, 300);
}


function wrongWordGuessed(button) {

    wrongGuessCount++;

    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`

    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;

    button.disabled = true

    if(wrongGuessCount === maxGuesses) {

        gameOver(false)
     
     }
      

    

   
} 

function initGame(actualButton,clickedLetter) {
    if(currentWord.includes(clickedLetter)) {
       addLetterToTheBoard(clickedLetter)
    } else {
        wrongWordGuessed(actualButton)
        
    }
}


// Create the buttons dynamically and add event listeners
for (let i =97;i<=122;i++) {
    const button = document.createElement('button')
    button.innerText = String.fromCharCode(i)

    keyboardDiv.appendChild(button)
    button.addEventListener('click',(e)=>initGame(e.target,String.fromCharCode(i)))

}
getRandomWord()



countdown(40, addSecondsOnHTML);

function timeIsOver(seconds) {
    if(seconds ===0) {
        yourTimeIsOver()
    }
    
}   
function yourTimeIsOver() {
    if(!gameModal.classList.contains('show')) {
        gameModal.querySelector('h4').innerHTML = 'Seu tempo acabou !'
        gameModal.querySelector('img').src = 'images/timeIsOver.gif'
        gameModal.querySelector('img').classList.add('timeIsOverImg')
        gameModal.classList.add('show')
    }

    
}
