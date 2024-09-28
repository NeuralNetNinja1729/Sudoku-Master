
var numSelected = null;
var tileSelected = null;
var initialBoard = []
var errors = 0;

var board = [
    "---1-2---",
    "6-----7--",
    "-8----9--",
    "4-------3",
    "5---7----",
    "2---8---1",
    "-9---8-5-",
    "7-----6--",
    "---3-4---"
];

window.onload = function () {
    setGame();
}

function setGame() {

    initialBoard = board.map(row => row.split('').map(cell => cell === "-" ? 0 : parseInt(cell)));
    for (let i = 1; i <= 9; i++) {

        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        if (initialBoard[r][c] === 0) {

            if (isSafe(initialBoard, r, c, parseInt(numSelected.id))) {
                this.innerText = numSelected.id;
                initialBoard[r][c] = parseInt(numSelected.id);
            } else {
                window.alert(`The number ${numSelected.id} being placed is violating the rules of sudoku!!`)
                // this.style.backgroundColor = 'red';
                errors += 1;
                document.getElementById('errors').innerText = errors;
            }
        }

    }
}

function isSudokuValid(grid) {
    const seen = {
        horizontal: new Set(),
        vertical: new Set(),
        square: new Set()
    };

    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            const horizontalCell = grid[x][y];
            const verticalCell = grid[y][x];
            const squareCell = grid[3 * Math.trunc(x / 3) + Math.trunc(y / 3)][3 * (x % 3) + (y % 3)];

            if (!processCellValue(horizontalCell, 'horizontal', x, y, seen)) return false;
            if (!processCellValue(verticalCell, 'vertical', y, x, seen)) return false;
            if (!processCellValue(squareCell, 'square', x, y, seen)) return false;
        }

        seen.horizontal.clear();
        seen.vertical.clear();
        seen.square.clear();
    }

    return true;
}

function processCellValue(value, type, row, col, seen) {
    if (value === "") return true;

    const key = `${value}-${type}`;
    if (seen[type].has(key)) {
        console.log(`${type} violation detected`);
        return false;
    }

    seen[type].add(key);
    return true;
}

function convertToArray(localBoard) {
    let board_arr = []
    for (let i = 0; i < localBoard.length; i++) {
        let board_row = []
        for (let j = 0; j < localBoard[i].length; j++) {
            if (localBoard[i][j] === '-') {
                board_row.push(0)
            } else {
                board_row.push(parseInt(localBoard[i][j]))
            }
        }
        board_arr.push(board_row)
    }
    return board_arr
}
function onCheckPressed() {

    let board_arr = convertToArray(board)
    bool = isSudokuValid(board_arr)
    if (!bool) window.alert('Sorry the answer is not valid')
}

delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// main logic - backtracking
async function sudokuSolver(sudoku, row = 0, col = 0) {
    if (row === 9 && col === 0) {
        return true;
    }
    let nextRow = row, nextCol = col + 1;
    if (col + 1 === 9) {
        nextRow = row + 1;
        nextCol = 0;
    }
    if (sudoku[row][col] !== 0) {
        return await sudokuSolver(sudoku, nextRow, nextCol);
    }
    for (let digit = 1; digit <= 9; digit++) {
        if (isSafe(sudoku, row, col, digit)) {

            sudoku[row][col] = digit;
            document.getElementById(`${row}-${col}`).innerText = digit
            initialBoard[row][col] = digit;
            await delay(20);
            if (await sudokuSolver(sudoku, nextRow, nextCol)) {
                return true;
            }
            sudoku[row][col] = 0;
            document.getElementById(`${row}-${col}`).innerText = '';
            initialBoard[row][col] = -1;
            await delay(20);
        }
    }
    return false;
}

function isSafe(sudoku, row, col, digit) {
    for (let j = 0; j < 9; j++) {
        if (sudoku[row][j] === digit) {
            return false;
        }
    }

    for (let i = 0; i < 9; i++) {
        if (sudoku[i][col] === digit) {
            return false;
        }
    }

    let sr = Math.floor(row / 3) * 3;
    let sc = Math.floor(col / 3) * 3;
    for (let i = sr; i < sr + 3; i++) {
        for (let j = sc; j < sc + 3; j++) {
            if (sudoku[i][j] === digit) {
                return false;
            }
        }
    }

    return true;
}

document.querySelector('#checkButton').addEventListener('click', function () {
    console.log('button pressed')
    bool = isSudokuValid(initialBoard)
    if (!bool) {
        window.alert('Sorry the solution is not valid')
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    else window.alert('Sudoku valid')
})

document.querySelector('#resetButton').addEventListener('click', () => {
    console.log('reset button pressed')
    document.getElementById('board').innerHTML = ""
    document.getElementById('digits').innerHTML = ""
    setGame();
})



document.querySelector('#solveButton').addEventListener('click', function () {
    // console.log(convertToArray())
    console.log(convertToArray(board))
    if (!sudokuSolver(convertToArray(board))) {
        window.alert('Sorry the sudoku is not solvable')
    } else {
        // window.alert('solved successfully')
    }
})