let min = 1,
    max = 10,
    winningNum = getRandomNumber(min,max),
    guessesLeft = 3;

let game = document.querySelector("#game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessBtn = document.querySelector("#guess-btn"),
    guessInput = document.querySelector('#guess-input')
    message = document.querySelector('.message'),
    playAgain = document.querySelector('.play-again');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})

guessBtn.addEventListener('click', function() {
    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess < min || guess > max ) {
        setMessage(`Please enter the number between ${min} and ${max}`,'red');
    }

    if(guess === winningNum) {
        gameOver(true,`${guess} is correct. YOU WIN !!!`)        
    } else {
        guessesLeft--;
        guessInput.value = '';
        if(guessesLeft === 0) {
            gameOver(false,`The correst number was ${winningNum}, You Lost !!!!`);
        } else {
            setMessage(`Wrong Number, ${guessesLeft} guessess left`,'red');
            guessInput.style.borderColor = 'red';
        }
    }
});

function gameOver(won, msg) {
    let color;
    won ? color='green' : color = 'red';
    guessInput.disabled;
    guessInput.style.borderColor = color;
    setMessage(msg,color);
    guessBtn.value='Play Again';
    guessBtn.className+='play-again';
}

function getRandomNumber(min,max) {
    let winNumber = Math.floor(Math.random()*(10)+min);
    console.log(winNumber);
    return winNumber;
}

function setMessage(msg,color) {
    message.style.color = color;
    message.textContent = msg;
}

