import react from "react";
// import keys from "../keys.json"

const Keypad = ({ keys, dispatch }) => {
  const normalKeys = keys.filter((key) => key.keyType === "normal");

  const operatorKeys = keys.filter((key) => key.keyType === "operator");

  const normalKeysElem = normalKeys.map((key) => (
    <div className="key" 
        key={key.keyID}
        onClick={() => dispatch({type: "INPUT_DIGIT", payload: key.keyValue})}
    >
      <p>{key.keyValue}</p>
    </div>
  ));

  const operatorKeysElem = operatorKeys.map((key) => (
    <div className="key" 
        key={key.keyID}
        onClick={() => dispatch({type: "OPERATION", payload: key.keyValue})}
    >
      <p>{key.keyValue}</p>
    </div>
  ));


  return (
    <div className="keypad">
      <div className="keys">
          {normalKeysElem}
          <div className="key">
              {keys[11].keyValue}
          </div>
      </div>
      <div className="operators">
          <div className="key" style={{backgroundColor: "red", color: "white"}}>
              {keys[12].keyValue}
          </div>
          {operatorKeysElem}
      </div>
    </div>
  );
};

export default Keypad;
