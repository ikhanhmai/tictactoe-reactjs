import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/board';
import GameInfo from './components/gameInfo';
import Step from './components/step';
import {calculateWinner, convertIndexToCoordinate} from './helpers/helpers';
import {NUMBER_OF_COL, NUMBER_OF_ROW} from './constants';
  class Game extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        isDraw: false
      }
  }
  handleClick(i) {
    const history = this.state.history;
    
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    if(history.length >= NUMBER_OF_COL*NUMBER_OF_ROW && calculateWinner(squares).winner === null){
      this.setState({isDraw:true});
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

      const winnerResult = calculateWinner(current.squares);
      let winner, winnerLine;
      if(winnerResult !== null){
        winner = winnerResult.winner;
        winnerLine = winnerResult.line;
      }
      const moves = getMoves(history,this);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } 
      else if(this.state.isDraw) {
        status = 'Draw';
      }
      else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
              <Board
                winnerLine = {winnerLine}
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
