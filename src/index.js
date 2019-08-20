import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board';
import Step from './components/step';
import {calculateWinner, convertIndexToCoordinate} from './helpers/helpers';
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
          xIsNext: true
      }
  }
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber]; 
      const winner = calculateWinner(current.squares);
      const moves = getMoves(history,this);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  function jumpTo(step,game) {
    game.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  function getMoves(history,game){
    return history.map((step, move) => {
      console.log(step);
      const desc = move ?
        'Go to move #' + move +": "+convertIndexToCoordinate(move):
        'Go to game start';
      return (
        <Step move={move} onClick={() => jumpTo(move,game)} desc={desc}/>
      );
    });
  }

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
