//////// PLAYER OBJECT ////////
const Player = (name) => {
    let playerName = name.value;
    const youWon = () => `Congrats, ${playerName}! You won the game!`;
    return {youWon};
}

//////// BASIC SETUP ////////
const gameBoard = (() => {

    let gameArray = [
        {'marker': '', 'value': ''},
        {'marker': '', 'value': ''},
        {'marker': '', 'value': ''},
        {'marker': '', 'value': ''},
        {'marker': '', 'value': ''},
        {'marker': '', 'value': ''},
        {'marker': '', 'value': ''},
        {'marker': '', 'value': ''},
        {'marker': '', 'value': ''}
    ]
    
    let currentPlayer = 1;
    
    //bind to DOM
    const startButton = document.getElementById('startGame');
    const loadGameModal = document.getElementById('loadGame');

    //start first game
    startButton.addEventListener('click', (e) = () => {
        getPlayerNames();
        startGame();
    });
    
    const startGame = () => {
        for (i = 0; i < gameArray.length; i++) {
            let currentSquare = document.getElementById(i);
            currentSquare.addEventListener('click', (e) = () => {
                updateGameMarker(currentSquare);
            });
        }
        loadGameModal.style.display = 'none';       
    }

    const getPlayerNames = () => {
        const player1 = Player(document.getElementById('player1'));
        const player2 = Player(document.getElementById('player2'));
    }

    //update marker and value on each turn
    const updateGameMarker = (currentSquare) => {
        if (currentSquare.innerHTML) {
            alert('Plz choose another sqaure');
        } else if (currentPlayer === 1) {
            gameArray[currentSquare.id].marker = 'X';
            gameArray[currentSquare.id].value = 1;
            currentPlayer = 2;
            render();
        } else if (currentPlayer === 2) {
            gameArray[currentSquare.id].marker = 'O';
            gameArray[currentSquare.id].value = 2;
            currentPlayer = 1;
            render();
        }
    }
    
    //update the game board
    const render = () => {
        for (i = 0; i < gameArray.length; i++) {
            let renderSquare = document.getElementById(i);
            renderSquare.innerHTML = gameArray[i].marker;           
        }
        gameLogic.checkForWin();
    }

    //start a new game
    const newGame = () => {
        for (i = 0; i < gameArray.length; i++) {
            gameArray[i].marker = '';
            gameArray[i].value = '';
        }
        currentPlayer = 1;
        render();
    }

    return { gameArray, newGame };

})();

//////// GAME LOGIC ////////
const gameLogic = (() => {

    let sq = gameBoard.gameArray;
    let gameOver = document.getElementById('gameOver');
    let gameOverMessage = document.getElementById('gameOverMessage');

    //winning combos sum function
    const sum = (x, y, z) => {
        return x + y + z;
    }

    //possible winning combos
    const checkForWin = () => {
        let winningCombos = [
            sum(sq[0].value, sq[1].value, sq[2].value),
            sum(sq[3].value, sq[4].value, sq[5].value),
            sum(sq[6].value, sq[7].value, sq[8].value),
            sum(sq[0].value, sq[3].value, sq[6].value),
            sum(sq[1].value, sq[4].value, sq[7].value),
            sum(sq[2].value, sq[5].value, sq[8].value),
            sum(sq[0].value, sq[4].value, sq[8].value),
            sum(sq[2].value, sq[4].value, sq[6].value)
        ];
        announceWinner(winningCombos);
    }

    //check for a 3 (X wins) or a 6 (Y wins)
    const announceWinner = (winningCombos) => {
        for (i = 0; i < winningCombos.length; i++) {
            if (winningCombos[i] === 3) {;
                gameOver.style.display = 'block';
                gameOverMessage.innerHTML = `${Player(player1).youWon()}`
            } else if (winningCombos[i] === 6) {
                gameOver.style.display = 'block';
                gameOverMessage.innerHTML = `${Player(player2).youWon()}`
            }
        }
        checkForTie();
    }

    //if no winner when all squares are marked
    const checkForTie = () => {
        let emptySquares = 0;
        for (i = 0; i < sq.length; i++) {
            if (!sq[i].marker) {
                emptySquares ++;
            }
        }
        if (emptySquares === 0 && gameOver.style.display != 'block') {
            gameOver.style.display = 'block';
            gameOverMessage.innerHTML = 'Tie game';
        }
    };
    
    //play again modal
    const playAgainButton = document.getElementById('playAgain');
    playAgainButton.addEventListener('click', (e) = () => {
        gameBoard.newGame();
        gameOver.style.display = 'none';
    });

    return { checkForWin }


})();