import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    //Returns true or false randomly.
    const randBool = () => {
      const random = Math.round(Math.random() * 1);
      return random === 1 ? true : false;
    };

    // Creates an a nrow x ncols array of arrays of true/false values
    const initialBoard = Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, () => randBool())
    );
    return initialBoard;
  }

  function hasWon() {
    //Check the board in state to determine whether the player has won.
    //isLit is a boolean value (true ifLit).
    //If at least one cell is true (aka lit) hasWon will return false.
    //Will return true if all cells are false(unlit).
    console.log(board)
    return board.some((row) => !row.some((isLit) => isLit===true));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      //Make a deep copy of the current board.
      const newBoard = [...oldBoard];

      const flipCell = (y, x, newBoard) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          newBoard[y][x] = !newBoard[y][x];
        }
      };

      //Flip the clicked cell and all the cells around it in the copy
      flipCell(y, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);

      //Return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <h1>You have won!!</h1>;
  } else {
    // make table board
    return (
      <table>
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <Cell
                  key={`${y}-${x}`}
                  coord={`${y}-${x}`}
                  flipCellsAroundMe={flipCellsAround}
                  isLit={cell}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  // TODO

  // TODO
}

export default Board;
