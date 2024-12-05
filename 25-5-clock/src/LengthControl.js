import React from "react";

function LengthControl({ title, count, increment, decrement, id }) {
  return (
    <div className="length-control">
      <h2 id={`${id}-label`}>{title}</h2>
      <div>
        <button id={`${id}-decrement`} onClick={decrement}>
          -
        </button>
        <span id={`${id}-length`}>{count}</span>
        <button id={`${id}-increment`} onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
}

export default LengthControl;
