# Sudoku Master

Sudoku Master is a web-based Sudoku game that allows players to enjoy the classic number puzzle game right in their browser. With a clean and responsive interface, this game provides an engaging Sudoku experience for players of all levels.

![Screenshot 2024-09-28 at 3 30 30 AM](https://github.com/user-attachments/assets/f46fcd9b-df1a-4203-a7f0-8141e0077089)

## Features

- Interactive Sudoku board
- Number selection panel
- Error tracking
- Board state validation
- Auto-solve functionality
- Reset option for starting a new game
- Responsive design for various screen sizes

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

## Setup

To run this project locally:

1. Clone the repository or download the source files.
2. Ensure you have the following files in the same directory:
   - `index.html`
   - `sudoku.css`
   - `sudoku2.js`
3. Open the `index.html` file in a modern web browser.

## How to Play

1. Click on an empty cell on the Sudoku board.
2. Select a number from the digits panel at the bottom.
3. The selected number will be placed in the cell if it doesn't violate Sudoku rules.
4. Continue filling the board until all cells are correctly filled.

## Game Controls

- **Check**: Validates the current board state and alerts if the solution is valid or not.
- **Reset**: Clears the board and starts a new game.
- **Solve**: Automatically solves the Sudoku puzzle using a backtracking algorithm.

## Error Handling

The game keeps track of errors made during gameplay. The error count is displayed at the top of the game board.

## Solving Algorithm

The auto-solve functionality in Sudoku Master uses a backtracking algorithm inspired by the LeetCode problem "Sudoku Solver" (https://leetcode.com/problems/sudoku-solver/). Here's how the algorithm works:

1. Find an empty cell on the board.
2. Try placing numbers 1-9 in the empty cell.
3. For each number:
   - Check if the number is valid in the current position (row, column, and 3x3 box).
   - If valid, recursively try to fill the rest of the board.
   - If the recursive call is successful, the puzzle is solved.
   - If not, backtrack by removing the number and try the next one.
4. If no number works, the algorithm backtracks to the previous cell and tries a different number.

This approach efficiently explores all possible combinations until a valid solution is found or determines that no solution exists.

## Customization

You can easily customize the game's appearance by modifying the CSS files:
- `sudoku.css`: Contains styles for the main layout and responsive design.

## Contributing

Contributions to improve Sudoku Master are welcome. Please feel free to fork the repository and submit pull requests.

## License

See the LICENSE file for details.

## Acknowledgments

The auto-solve functionality in Sudoku Master is made possible thanks to the backtracking algorithm outlined in the LeetCode problem "Sudoku Solver". This problem served as a key inspiration for implementing a robust and efficient solution mechanism for the game. The clear explanation and the wealth of community solutions on LeetCode helped shape the foundation of the solving algorithm used in Sudoku Master. Special thanks to LeetCode for providing such valuable resources to the developer community!

---

Enjoy playing Sudoku Master!

