import React from "react";

const Keypad = (props) => {
  const { keys, dispatch } = props;

  const normalKeys = keys.filter((key) => key.keyType === "normal");

  const operatorKeys = keys.filter((key) => key.keyType === "operator");

  const normalKeysElem = normalKeys.map((key) => (
    <div
      className="key"
      key={key.keyID}
      onClick={() => dispatch({ type: "INPUT_DIGIT", payload: key.keyValue })}
    >
      <p>{key.keyValue}</p>
    </div>
  ));

  const operatorKeysElem = operatorKeys.map((key) => (
    <div
      className="key"
      key={key.keyID}
      onClick={() => dispatch({ type: "OPERATION", payload: key.keyValue })}
    >
      <p>{key.keyValue}</p>
    </div>
  ));

  return (
    <div className="keypad">
      <div className="keys">
        <div
          className="clear-all key"
          onClick={() => dispatch({ type: "CLEAR_SCREEN" })}
        >
          CLEAR
        </div>
        <div className="digit-keys">
          {normalKeysElem}
          <div className="key" onClick={() => dispatch({ type: "EQUAL" })}>
            {keys[11].keyValue}
          </div>
        </div>
      </div>

      <div className="operators">
        <div
          className="key"
          style={{ backgroundColor: "green", color: "white" }}
          onClick={() => dispatch({ type: "DELETE_DIGIT" })}
        >
          {keys[12].keyValue}
        </div>
        {operatorKeysElem}
      </div>
    </div>
  );
};

export default Keypad;
