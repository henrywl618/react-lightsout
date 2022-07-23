import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float between 0 to 1 inclusive, chance any cell is lit at start of game
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

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit (true) or unlit (false) */
  function createBoard() {
    const randBool = () => {
      //Returns true or false based on chanceLightStartsOn.
      const random = Math.random();
      return random < chanceLightStartsOn ? true : false;
    };

    // Creates an a nrow x ncols array of arrays of true/false values
    const initialBoard = Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, () => randBool())
    );
    return initialBoard;
  }

  function hasWon() {
    //Check the board in state to determine whether the player has won.

    //Use Array.some() to find at least one lit (true) cell. If at least one cell is lit anyCellsList will be true, if all cells are unlit it will be false.
    const anyCellsLit = board.some((row) => {
      return row.some((isLit) => {
        return isLit === true;
      });
    });

    //If anyCellsLit is true, the game has not been won yet so we return false.
    //Else if anyCellsLit is false, the game has been won so we return true.
    return anyCellsLit ? false : true;
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
