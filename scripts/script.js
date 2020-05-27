//REPLACE WITH PLAYER OBJECT
const Player = (name) => {
    const playerName = name;
    const youWon = () => console.log(`Congrats, ${playerName}! You won the game!`);
    return {youWon};
}

const player1 = Player('Joni');
const player2 = Player('Andrea');
let currentPlayer = 1;

//////// BASIC SETUP ////////
const gameBoard = (() => {
    
    const gameArray = ['', '', '', '', '', '', '', '', ''];

    //bind game square
    const startButton = document.getElementById('start-game');
    startButton.addEventListener('click', (e) = () => {
        onLoad();
    });

    const onLoad = () => {
        for (i = 0; i < gameArray.length; i++) {
            let currentSquare = document.getElementById('square'+(i+1));
            currentSquare.setAttribute('data-pos', i);
            currentSquare.addEventListener('click', (e) = () => {
                setArrayValue(currentSquare);
            });
        }       
    }
    
    //start new game
    const startNewGame = () => {
        currentPlayer = 1;
        for (i = 0; i < gameArray.length; i++) {
            let currentSquare = document.getElementById('square'+(i+1));
            currentSquare.innerHTML = '';
        }     
    };

    //update array with either a 1 or a 2
    const setArrayValue = (currentSquare) => {
        let dataPos = currentSquare.getAttribute('data-pos');
        if (currentPlayer === 1) {
            gameArray.splice(dataPos, 1, 1);
            currentPlayer = 2;
        } else {
            gameArray.splice(dataPos, 1, 2);
            currentPlayer = 1;
        }
        
        render(dataPos, currentSquare);
        gameController.updateCombos();
    }

    //Update square with an X, O or ''
    const render = (dataPos, currentSquare) => {
        if (gameArray[dataPos] === 1) {
            currentSquare.innerHTML = 'X';
        } else if (gameArray[dataPos] === 2) {
            currentSquare.innerHTML = 'O';
        }
    }

    return { gameArray, startNewGame };

})();


//////// GAME STATE ////////
const gameController = (() => {

    let square = gameBoard.gameArray;

    //winning combos sum function
    const sum = (x, y, z) => {
        return x + y + z;
    }

    //possible winning combos
    const updateCombos = () => {
        let winningCombos = [
            sum(square[0], square[1], square[2]),
            sum(square[3], square[4], square[5]),
            sum(square[6], square[7], square[8]),
            sum(square[0], square[3], square[6]),
            sum(square[1], square[4], square[7]),
            sum(square[2], square[5], square[8]),
            sum(square[0], square[4], square[8]),
            sum(square[2], square[4], square[6])
        ];
        checkForWin(winningCombos);
    }

    //check for a 3 (X wins) or a 6 (Y wins)
    const checkForWin = (winningCombos) => {
        for (i = 0; i < winningCombos.length; i++) {
            if (winningCombos[i] === 3) {
                console.log(`${player1.youWon()}`);
            } else if (winningCombos[i] === 6) {
                console.log(`${player2.youWon()}`);
            }
        }
    }

    return { updateCombos, square }

})();