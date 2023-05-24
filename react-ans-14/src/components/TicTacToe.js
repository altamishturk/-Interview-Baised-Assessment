import React, { Component } from 'react';
import "./style.css";

class TicTacToeGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    };
  }

  handleClick(index) {
    const { board, currentPlayer, winner } = this.state;

    if (board[index] === null && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;

      this.setState({
        board: newBoard,
        currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      });

      this.checkWinner(newBoard, currentPlayer);
    }
  }

  checkWinner(board, player) {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];

      if (board[a] === player && board[b] === player && board[c] === player) {
        this.setState({ winner: player });
        break;
      }
    }

    const full = board.find(b => b === null);
    if(full === undefined){
      this.setState({ winner: "Tie" });
    }
  }

  resetGame() {
    this.setState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    });
  }

  render() {
    const { board, currentPlayer, winner } = this.state;

    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`cell ${cell}`}
              onClick={() => this.handleClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        {winner && <h2>Winner: {winner}</h2>}
        {!winner && <h2>Current Player: {currentPlayer}</h2>}
        <button onClick={() => this.resetGame()}>Reset Game</button>
      </div>
    );
  }
}

export default TicTacToeGame;
