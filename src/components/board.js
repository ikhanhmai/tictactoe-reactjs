import React from 'react';
import Square from './square.js';
import {NUMBER_OF_COL, NUMBER_OF_ROW} from '../constants';
class Board extends React.Component {
    
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }

  render() {
    let boardArr = [];
    let colsArr = [];
    for(let i=0; i< NUMBER_OF_ROW;i++){
      colsArr = [];
      for(let j=0; j<NUMBER_OF_COL;j++){
        colsArr.push(this.renderSquare(j+i*NUMBER_OF_COL));
      }
      boardArr.push(<div className="board-row">{colsArr}</div>);
    }
    return (
      <div>
        {boardArr}
      </div>
    );
  }
}
export default Board;