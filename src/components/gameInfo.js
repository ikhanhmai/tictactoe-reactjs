import React from 'react';
class GameInfo extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        ascending: true
      }
  }
  render() {
    return (
        <div className="game-info">
            <div>{this.props.status}</div>
            <button onClick={() => this.setState((state) => ({ascending: !state.ascending}))}>Sort {this.state.ascending ? "Ascending" : "Descending"}</button>
            <ol>{this.state.ascending ? this.props.moves.sort((a,b) => a.key - b.key) : this.props.moves.sort((a,b) => b.key - a.key)}</ol>
        </div>
    )
  }
}
export default GameInfo;