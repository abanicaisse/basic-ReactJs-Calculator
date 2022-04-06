import React from "react";

const Screen = (props) => {
  const { inputScreen, outputScreen, operation, overwrite } = props;

  return (
    <div className="screen">
      <div className="output">
        <p className="output__field">
          {outputScreen} {operation}
        </p>
      </div>
      <div className="input">
        <p
          className="input__field"
          style={{
            fontSize: overwrite ? "2rem" : "inherit",
            fontWeight: overwrite ? "bold" : "inherit",
          }}
        >
          {inputScreen}
        </p>
      </div>
    </div>
  );
};

export default Screen;
