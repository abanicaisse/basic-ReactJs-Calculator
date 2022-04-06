import React from "react";

import Keypad from "./components/Keypad";
import Screen from "./components/Screen";
import { useReducer } from "react";
import keys from "./keys.json";

const initialState = {
  inputScreen: null,
  outputScreen: null,
  operation: "",
  overwriteAfterEqual: false,
};

const makeCalculation = (operation, inputScreen, outputScreen) => {
  const inputDigit = parseFloat(inputScreen);
  const outputDigit = parseFloat(outputScreen);

  switch (operation) {
    case "+":
      return outputDigit + inputDigit;
    case "-":
      return outputDigit - inputDigit;
    case "/":
      return outputDigit / inputDigit;
    case "*":
      return outputDigit * inputDigit;
    default:
      return;
  }
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "INPUT_DIGIT":
      if (payload === 0 && state.inputScreen === "0") return state;
      if (payload === "." && state.inputScreen.includes(".")) return state;
      if (state.overwriteAfterEqual) {
        state.inputScreen = null;
        return {
          ...state,
          overwriteAfterEqual: false,
          inputScreen: `${
            state.inputScreen ? state.inputScreen : ""
          }${payload}`,
        };
      }

      return {
        ...state,
        inputScreen: `${state.inputScreen ? state.inputScreen : ""}${payload}`,
        overwriteAfterEqual: false,
      };
    case "OPERATION":
      if (state.inputScreen === null && state.outputScreen === null)
        return state;

      if (state.outputScreen === null) {
        return {
          ...state,
          operation: payload,
          outputScreen: state.inputScreen,
          inputScreen: null,
        };
      }

      if (state.outputScreen && state.inputScreen === null) {
        return {
          ...state,
          operation: payload,
        };
      }

      return {
        ...state,
        operation: payload,
        outputScreen: makeCalculation(
          state.operation,
          state.inputScreen,
          state.outputScreen
        ),
        inputScreen: null,
      };
    case "EQUAL":
      if (state.outputScreen === null) {
        return {
          ...state,
          overwriteAfterEqual: true,
        };
      }
      if (state.outputScreen && state.inputScreen === null) {
        return {
          ...state,
          inputScreen: state.outputScreen,
          outputScreen: null,
          operation: null,
          overwriteAfterEqual: true,
        };
      }

      return {
        ...state,
        inputScreen: makeCalculation(
          state.operation,
          state.inputScreen,
          state.outputScreen
        ),
        outputScreen: null,
        operation: null,
        overwriteAfterEqual: true,
      };
    case "DELETE_DIGIT":
      if (state.overwriteAfterEqual) {
        return {
          ...state,
          inputScreen: null,
          operation: null,
          overwriteAfterEqual: false,
        };
      }
      if (state.outputScreen && state.inputScreen === null) {
        return {
          ...state,
          operation: null,
          // outputScreen: state.outputScreen.slice(0, -2)
        };
      }
      if (state.inputScreen === null) return state;
      if (state.inputScreen.length === 1) {
        return {
          ...state,
          inputScreen: null,
        };
      }
      return {
        ...state,
        inputScreen: state.inputScreen.slice(0, -1),
      };
    case "CLEAR_SCREEN":
      return {
        ...state,
        inputScreen: null,
        outputScreen: null,
        operation: null,
        overwriteAfterEqual: false,
      };
    default:
      return state;
  }
};

function App() {
  const [
    { inputScreen, outputScreen, operation, overwriteAfterEqual },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <main>
      <Screen
        inputScreen={inputScreen}
        outputScreen={outputScreen}
        operation={operation}
        overwrite={overwriteAfterEqual}
      />
      <Keypad keys={keys} dispatch={dispatch} />
    </main>
  );
}

export default App;
