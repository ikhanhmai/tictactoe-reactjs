import React from 'react';
function Step(props) {
    return (
        <li key={props.move}>
          <button onClick={props.onClick} className={props.selected}>{props.desc}</button>
        </li>
    )
  }
  
export default Step;