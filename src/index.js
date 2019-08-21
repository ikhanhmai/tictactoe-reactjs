import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board';
import GameInfo from './components/gameInfo';
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
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
              <GameInfo status={status} moves={moves} />
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
      const desc = move ?
        'Go to move #' + move +": "+convertIndexToCoordinate(move):
        'Go to game start';
      let selected = "unselected";
      if (game.state.stepNumber === move) selected = "selected";
      return (
        <Step key={move} move={move} onClick={() => {jumpTo(move,game);} } selected={selected} desc={desc}/>
      );
    });
  }

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
