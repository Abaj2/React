/* C:\Users\Admin-User\Documents\Code\React\calculator-react-app */
import { useState } from "react";

function Calculator() {
  const [input, setInput] = useState("0");
  const [previousInput, setPreviousInput] = useState("");
  const [operator, setOperator] = useState(null);

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("0");
      setPreviousInput("");
      setOperator(null);
    } else if (value === "=") {
      try {
        setInput(eval(previousInput + operator + input).toString());
      } catch {
        setInput("Error");
      }
      setPreviousInput("");
      setOperator(null);
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (input !== "0") {
        setPreviousInput(input);
        setOperator(value);
        setInput("0");
      }
    } else if (value === ".") {
      if (!input.includes(".")) {
        setInput(input + ".");
      }
    } else {
      setInput(input === "0" ? value : input + value);
    }
  };
  return (
    <div className="calculator">
      <div id="display" className="display">
        {input}
      </div>
      <div className="buttons">
        {[
          "AC",
          "/",
          "*",
          "-",
          "+",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "0",
          ".",
        ].map((val) => (
          <button key={val} id={val} onClick={() => handleClick(val)}>
            {val}
          </button>
        ))}
        <button id="equals" onClick={() => handleClick("=")}>
          =
        </button>
      </div>
    </div>
  );
}
export default Calculator;
