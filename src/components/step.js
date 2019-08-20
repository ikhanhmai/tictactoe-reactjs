import React from 'react';
function Step(props) {
    return (
        <li key={props.move}>
          <button onClick={props.onClick}>{props.desc}</button>
        </li>
    )
  }
  
export default Step;