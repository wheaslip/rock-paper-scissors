let playerScore = 0;
let computerScore = 0;

const humans = document.querySelector('#humanScore');
const computers = document.querySelector('#computerScore');

const playButton = document.querySelector('#play');
playButton.addEventListener('click', () => {
    startGame("Choose your fate...");
});

const message = document.querySelector('#message');
const endMessage = document.querySelector('#endMessage');

const rockBtn = document.querySelector('.rock');
rockBtn.addEventListener('click', () => {
    message.textContent = playRound("Rock", getComputerChoice());
});

const paperBtn = document.querySelector('.paper');
paperBtn.addEventListener('click', () => {
    message.textContent = playRound("Paper", getComputerChoice());
});

const scissorsBtn = document.querySelector('.scissors');
scissorsBtn.addEventListener('click', () => {
    message.textContent = playRound("Scissors", getComputerChoice());
});

deactivateFurtherPlay (); // Keep game deactivated until player chooses to start.

// Changes button to label
function startGame(sign) {
    playButton.style.visibility = 'hidden';
    message.style.visibility = 'visible';
    message.textContent = sign;
    playerScore = 0;
    computerScore = 0;
    updateScore (true, true);
    endMessage.style.visibility = 'hidden';
    activateButtons ();
}

function updateScore (playerWin, reset = false) {
    if (reset) {
        humans.textContent = "Humans - 0,";
        computers.textContent = "Computers - 0.";
        return;
    }
    if (playerWin) {
        playerScore++;
        humans.textContent = `${playerScore} Humans`;
    }
    else {
        computerScore++;
        computers.textContent = `${computerScore} Computers`;
    }
    if (playerScore === 5 || computerScore === 5) {
        finishGame();
    }
}

function finishGame() {
    if (playerScore === 5) {
        endMessage.textContent = "I let you win, so as not hurt your pathetic fragil human ego."
    }
    else {
        endMessage.textContent = "I knew it! Even in a game of chance computers are superior to your weak fleshy human brains!"
    }
    endMessage.style.visibility = 'visible';
    deactivateFurtherPlay ();
    playButton.style.visibility = 'visible';
    playButton.textContent = "Play again?";
}

function deactivateFurtherPlay () {
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
}

function activateButtons () {
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;    
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.slice(0, 1).toUpperCase() +
        playerSelection.slice(1).toLowerCase();

    if (playerSelection === computerSelection) {
        return `Tie game! Both players played ${playerSelection}!`;
    }
    else if (playerSelection === "Rock") {
        if (computerSelection === "Paper") {
            updateScore(false);
            return "You lose! Paper beats Rock!";
        }
        else {
            updateScore(true);
            return "You win! Rock beats Scissors!";
        }
    }
    else if (playerSelection === "Scissors") {
        if (computerSelection === "Rock") {
            updateScore(false);
            return "You lose! Rock beats Scissors!";
        }
        else {
            updateScore(true);
            return "You win! Scissors beat Paper!";
        }
    }
    else if (computerSelection === "Scissors") {
        updateScore(false);
        return "You lose! Scissors beat Paper!";
    }
    else {
        updateScore(true);
        return "You win! Paper beats Rock!";
    }
}

function getComputerChoice() {
    let choice = (Math.floor(Math.random() * 3));
    switch (choice) {
        case 0:
            return "Rock";
        case 1:
            return "Scissors";
        default:
            return "Paper";
    }
}

