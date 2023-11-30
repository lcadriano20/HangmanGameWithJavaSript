const keyboardDiv  = document.querySelector(".keyboard")
const hangmanImage = document.querySelector('.hangman-box img')
const hintSpace    = document.querySelector('.hint-text')
const wordDisplay  = document.querySelector('.word-display')
const guessesText  = document.querySelector('.guesses-text b')
const gameModal    = document.querySelector('.game-modal')
const playAgain    = document.querySelector('.play-again')
let gamingTime     = document.querySelector('.gamingTime')
let timeAchieved   = document.querySelector('.timeAchieved')
let currentWord;
let wrongGuessCount = 0;
let wonOrLose= false;
const maxGuesses = 6;
let correctLetters = []
let currentCount;



function progressiveCounter(callback) {
    let count = 0;

    const intervalId = setInterval(function () {
        count++;
        callback(count);

        if(gameModal.classList.contains('show') && wonOrLose === true) {
            clearInterval(intervalId);
            timeAchieved.innerHTML = `Seu tempo foi ${count}`
            timeAchieved.style.color ='green'
        }
        if(gameModal.classList.contains('show')) {
            clearInterval(intervalId);
        }
    }, 1000);

    return intervalId;
}

// Exemplo de uso:
progressiveCounter(function (currentCount) {
    addSecondsOnHTML(currentCount)
    
})
function timeIsOver(seconds) {
    if(seconds>20) {
        yourTimeIsOver()
    }
}



function addSecondsOnHTML(seconds) {
    gamingTime.innerHTML = seconds;
    gamingTime.classList.add('gamingTime')
    timeIsOver(seconds)
}


// Restart the Game 
function resetGame() {
    correctLetters = []
    hintSpace.innerHTML = ''
    wordDisplay.innerHTML = ''
    gamingTime.innerHTML = ''
    const buttons = keyboardDiv.querySelectorAll('button')
    buttons.forEach((btn)=>{
        btn.style.backgroundColor = '#5E63BA'
    })
    wrongGuessCount = 0
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    wordDisplay.innerHTML = currentWord.split("").map(()=> `<li class="letter"></li>`).join("")
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`
    keyboardDiv.querySelectorAll('button').forEach(btn=> {
        btn.disabled= false
    })

    gameModal.classList.remove('show')

    progressiveCounter(function (currentCount) {
        addSecondsOnHTML(currentCount)
        
    })
    


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
        console.log(correctLetters.length)
        console.log(currentWord.length)
        wonOrLose = true;
        
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
    button.style.backgroundColor = 'red'

    if(wrongGuessCount === maxGuesses) {
        gameOver(false)
     
     }
      

    

   
} 

function initGame(actualButton,clickedLetter) {
    if(currentWord.includes(clickedLetter)) {
        actualButton.style.backgroundColor = 'green'
        disableClickedLetter(actualButton)
        addLetterToTheBoard(clickedLetter)
    } else {
        wrongWordGuessed(actualButton)
        
    }
}
function disableClickedLetter(actualButton) {
    actualButton.disabled = true
}


// Create the buttons dynamically and add event listeners
for (let i =97;i<=122;i++) {
    const button = document.createElement('button')
    button.innerText = String.fromCharCode(i)

    keyboardDiv.appendChild(button)
    button.addEventListener('click',(e)=>initGame(e.target,String.fromCharCode(i)))

}
getRandomWord()






function yourTimeIsOver() {
    if(!gameModal.classList.contains('show')) {
        gameModal.querySelector('h4').innerHTML = 'Seu tempo acabou !'
        gameModal.querySelector('img').src = 'images/timeIsOver.gif'
        gameModal.querySelector('img').classList.add('timeIsOverImg')
        gameModal.classList.add('show')
    }

    
}
