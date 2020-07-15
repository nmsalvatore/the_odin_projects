const ticTacToe = (() => {
    let board = [
        null, null, null, 
        null, null, null, 
        null, null, null
    ];

    const winningMatches = [
        /[0,1,2]/g,
        /[0,4,8]/g,
        /[0,3,6]/g,
        /[1,4,7]/g,
        /[2,4,6]/g,
        /[3,4,5]/g,
        /[6,7,8]/g,
    ]

    const togglePlayer = () => {
        if (playerOne.isPlaying) {
            playerOne.isPlaying = false;
            playerTwo.isPlaying = true;
        } else {
            playerTwo.isPlaying = false;
            playerOne.isPlaying = true;
        }
    }

    const getBoard = () => board;

    const checkForWin = () => {
        const x = [];
        const o = [];

        board.forEach((marker, index) => {
            if (marker === 'x') x.push(index);
            if (marker === 'o') o.push(index);
        });

        checkAgainstMatches(x, playerOne);
        checkAgainstMatches(o, playerTwo);
        
        function checkAgainstMatches(marker, player) {
            for (let match of winningMatches) {
                const arr = marker.join('').match(match) || [];

                if (arr.length === 3) {
                    player.isWinner = true;
                    break;
                }
            }
        }
    }

    const startOver = () => {
        playerOne.isWinner = false;
        playerTwo.isWinner = false;
        board = board.map(() => null);
    }

    return { 
        getBoard,
        checkForWin,
        togglePlayer,
        startOver
    };
})();



const view = (() => {
    const _updateBoard = () => {
        const cells = domBoard.children;
        const board = ticTacToe.getBoard();

        for (let i in cells) {
            const cell = cells[i];

            cell.innerHTML = board[i];
        }
    }

    const _listenForEvents = () => {
        domBoard.addEventListener('click', playRound = (e) => {
            const cell = e.target;

            if (cell.className === 'cell') {
                if (playerOne.isPlaying) {
                    runRound(playerOne);
                    return;
                }

                if (playerTwo.isPlaying) {
                    runRound(playerTwo);
                    return;
                }
            }

            function runRound(player) {
                if (player.selectCell(cell.id)) return;

                ticTacToe.togglePlayer();
                ticTacToe.checkForWin();
                updateGameDisplay();
            }
        });

        playBtn.addEventListener('click', () => {
            toggleStyleDisplay(playBtn, playerOneName, 'block');
            playerOneNameInput.focus();
        });

        playerOneName.addEventListener('keydown', (e) => {
            if (e.which === 13) {
                playerOne.name = playerOneNameInput.value;
                toggleStyleDisplay(playerOneName, playerTwoName, 'block');
                playerTwoNameInput.focus();
            }
        });

        playerTwoName.addEventListener('keydown', (e) => {
            if (e.which === 13) {
                playerTwo.name = playerTwoNameInput.value;
                toggleStyleDisplay(playerTwoName, gameContainer, 'grid');
                updateGameDisplay();
            }
        });

        function toggleStyleDisplay(current, next, displayValue) {
            current.style.display = 'none';
            next.style.display = displayValue;
        }
    }

    const updateGameDisplay = () => {
        const cellsAreEmpty = checkForEmptyCells();

        if (playerOne.isWinner) {
            updateDisplayContent(`${playerOne.name} is the winner!`, '#ada', 'flex');
        } else if (playerTwo.isWinner) {
            updateDisplayContent(`${playerTwo.name} is the winner!`, '#ada', 'flex');
        } else if (!cellsAreEmpty) {
            updateDisplayContent('Tie game!', '#daa', 'flex');
        } else if (playerOne.isPlaying) {
            updateDisplayContent(`${playerOne.name}'s move`, 'lightblue');
        } else if (playerTwo.isPlaying) {
            updateDisplayContent(`${playerTwo.name}'s move`, 'peachpuff');
        }

        function checkForEmptyCells() {
            const empties = [];
            const board = ticTacToe.getBoard();

            for (let cell of board) {
                if (cell === null) empties.push(cell);
            }

            if (empties.length === 0) return false;

            return true;
        }

        function updateDisplayContent(text, color, gameCompleteDisplay = 'none') {
            gameDisplay.textContent = text;
            gameDisplay.style.background = color;
            gameComplete.style.display = gameCompleteDisplay;
        }
    }

    const startOver = () => {
        ticTacToe.startOver();
        updateGameDisplay();
        render();
    }



    const render = _updateBoard;
    const listen = _listenForEvents;

    return { 
        render, 
        listen, 
        updateGameDisplay, 
        startOver,
    };
})();



const player = (marker, isPlaying, isWinner) => {
    const selectCell = (num) => {
        const board = ticTacToe.getBoard();

        if (board[num]) return num;
        
        board[num] = marker;

        view.render();
    };

    return { selectCell, isPlaying, isWinner };
}

const playerOne = player('x', true, false);
const playerTwo = player('o', false, false);

view.listen();




















