const PLAYER_X = 'X';
const PLAYER_O = 'O';

let currentPlayer = PLAYER_X;
let board = ['', '', '', '', '', '', '', '', ''];
let gameMode = ""

function makeMove(index) {
    if (board[index] === '' && !isGameFinished()) {
        board[index] = currentPlayer;

        updateBoard();
        
        winner = isGameFinished()
        if (winner) {
            showWinnerMessage(winner);
            hideBoard();
        } else if (isBoardFull()) {
            showDrawMassage();
            hideBoard();
        } else if(gameMode == "HardOne") {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            if (currentPlayer === PLAYER_O) {
                makeMoveHard();
            }
        } else if(gameMode == "EasyOne") {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            if (currentPlayer === PLAYER_O) {
                makeMoveEasy();
            }
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        }
    }
}

function isGameFinished() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

function isBoardFull() {
    return board.every(cell => cell !== '');
}

function restartGame() {
    currentPlayer = PLAYER_X;
    board = ['', '', '', '', '', '', '', '', ''];

    updateBoard();
}

function updateBoard() {
    const boardItems = document.querySelectorAll('.board_item');
    boardItems.forEach((item, index) => {
        item.textContent = board[index];
        item.className = 'board_item';
        if (board[index] === PLAYER_X) {
            item.classList.add('player-x');
        } else if (board[index] === PLAYER_O) {
            item.classList.add('player-o');
        }
    });
}

function hideBoard() {
    const boardElement = document.querySelector('.container');
    boardElement.style.display = 'none';
}

function showWinnerMessage(winner) {
    const winnerTextElement = document.getElementById('resultText');
    winnerTextElement.textContent = `Wygrał gracz ${winner}!`;

    const winnerMessageElement = document.getElementById('resultMessage');
    winnerMessageElement.style.display = 'block';
}

function showDrawMassage() {
    const winnerTextElement = document.getElementById('resultText');
    winnerTextElement.textContent = `Remis!`;

    const winnerMessageElement = document.getElementById('resultMessage');
    winnerMessageElement.style.display = 'block';
}

function playAgain(){
    const boardElement = document.querySelector('.container');
    boardElement.style.display = 'flex';

    restartGame();
    hideResultMessage();
}

function hideResultMessage(){
    const boardElement = document.querySelector('.resultMessage');
    boardElement.style.display = 'none';
}

function makeMoveHard() {
    if (!isGameFinished() && currentPlayer === PLAYER_O) {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = currentPlayer;
                let score = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        makeMove(bestMove);
    }
}

function minimax(board, depth, isMaximizing) {
    const winner = isGameFinished();
    if (winner !== null) {
        if (winner === PLAYER_X) {
            return -10 + depth;
        } else if (winner === PLAYER_O) {
            return 10 - depth;
        } else {
            return 0;
        }
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = PLAYER_O;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = PLAYER_X;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function onePlayerEasy() {
    gameMode = "EasyOne"
    currentPlayer = PLAYER_X;
    hideModeBoard();
    displayGameBoard();
}

function onePlayerHard() {
    gameMode = "HardOne"
    currentPlayer = PLAYER_X;
    hideModeBoard();
    displayGameBoard();
}

function twoPlayer() {
    gameMode = "GameForTwo"
    currentPlayer = PLAYER_X;
    hideModeBoard();
    displayGameBoard();
}

function hideModeBoard() {
    const modeBoard = document.querySelector('.mode_board');
    modeBoard.style.display = 'none';
}

function makeMoveEasy() {
    if (!isGameFinished() && currentPlayer === PLAYER_O) {
        let emptyCells = [];
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                emptyCells.push(i);
            }
        }
        if (emptyCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            let randomMove = emptyCells[randomIndex];
            makeMove(randomMove);
        }
    }
}

function displayGameBoard() {
    const boardElement = document.querySelector('.container');
    boardElement.style.display = 'flex';

    restartGame();
}

function changeGameMode() {
    const boardElement = document.querySelector('.container');
    boardElement.style.display = 'none';

    const menuElement = document.querySelector('.mode_board');
    menuElement.style.display = 'flex';
}
