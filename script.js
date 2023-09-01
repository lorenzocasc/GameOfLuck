'use strict';

let score1 = 0; //player 1 score
let score2 = 0; //player 2 score
let current1 = 2;  //player 1 rolling score
let current2 = 0;  //player 2 rolling score
let activePlayer = 1; //active player
let winner = 0; //winner flag

const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

//Function called when a player wins (totalize 20 points)
//It turns the winner's background green and changes the name to WINNER!
const thereIsAWinner = function() {
    winner = 1;
    if(activePlayer === 1){
        player1.style.backgroundColor = 'green';
        player1.getElementsByClassName('player1name')[0].textContent = 'WINNER!';
    } else {
        player2.style.backgroundColor = 'green';
        player2.getElementsByClassName('player2name')[0].textContent = 'WINNER!';
    }
}

//function called when a player clicks on HOLD button
//It adds the current score to the player's total score and changes the active player
const changePlayer = function() {
    if(winner === 0) {
        if (activePlayer === 1) {
            if (current1 !== 0) {
                score1 += current1;
                current1 = 0;
                displayScore1(score1);
                displayCurrent1(current1);
                if(score1 >= 20) {
                    thereIsAWinner();
                    return;
                }
            }
            player1.style.backgroundColor = 'darkgrey';
            player2.style.backgroundColor = '#d54b4b';
            activePlayer = 2;
        } else {
            score2 += current2;
            current2 = 0;
            displayScore2(score2);
            displayCurrent2(current2);
            if(score2 >= 20) {
                thereIsAWinner();
                return;
            }
            player1.style.backgroundColor = '#d54b4b';
            player2.style.backgroundColor = 'darkgrey';
            activePlayer = 1;
        }
    }
};

//function that rolls the dice and returns a random number between 1 and 6
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

//function that displays the score of player 1
const displayScore1 = function(score) {
    document.querySelector('.score1').textContent = score;
}

//function that displays the score of player 2
const displayScore2 = function(score) {
    document.querySelector('.score2').textContent = score;
}

const displayCurrent1 = function(score) {
    document.querySelector('.current-score1').textContent = score;
}

const displayCurrent2 = function(score) {
    document.querySelector('.current-score2').textContent = score;
}

//Event listener for the roll button
//it rolls the dice then checks if the player rolled a 1
//if not, it adds the dice value to the current score
//if yes, it changes the active player
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(winner === 0) {
        let dice = rollDice();
        document.querySelector('.dice').src = `dice-${dice}.png`;
        if (activePlayer === 1) {
            if (dice !== 1) {
                current1 += dice;
            } else {
                current1 = 0;
                changePlayer();
            }
            displayCurrent1(current1);
        } else {
            if (dice !== 1) {
                current2 += dice;
            } else {
                current2 = 0;
                changePlayer();
            }
            displayCurrent2(current2);
        }
    }
});

//Event listener for the NEW GAME button
document.querySelector('.btn-new').addEventListener('click', function() {
    score1 = 0;
    score2 = 0;
    current1 = 0;
    current2 = 0;
    winner = 0;
    displayScore1(score1);
    displayScore2(score2);
    displayCurrent1(current1);
    displayCurrent2(current2);
    player1.getElementsByClassName('player1name')[0].textContent = 'Player 1';
    player2.getElementsByClassName('player2name')[0].textContent = 'Player 2';
    player1.style.backgroundColor = '#d54b4b';
    player2.style.backgroundColor = 'darkgrey';
});

//Event listener for the HOLD button
document.querySelector('.btn-hold').addEventListener('click', changePlayer);

