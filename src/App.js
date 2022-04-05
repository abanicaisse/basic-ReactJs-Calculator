import Keypad from "./components/Keypad";
import Screen from "./components/Screen"
import { useReducer, useState } from "react"
import keys from "./keys.json"

const initialState = {
  inputScreen: null,
  outputScreen: null,
  operation: ""
}

const makeCalculation = (operation, inputScreen, outputScreen) => {
  const inputDigit = parseFloat(inputScreen)
  const outputDigit = parseFloat(outputScreen)

  switch(operation) {
    case "+":
      return outputDigit + inputDigit
    case "-": 
      return outputDigit - inputDigit
    case "/":
      return outputDigit / inputDigit
    case "*":
      return outputDigit * inputDigit
    default: 
      return
  }
}

export  const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case "INPUT_DIGIT":
    if (payload === 0 && state.inputScreen === "0") return state
    if (payload === "." && state.inputScreen.includes(".")) return state

    return {
      ...state,
      inputScreen: `${state.inputScreen ? state.inputScreen : ""}${payload}`,
    }
  case "OPERATION":
    if (state.inputScreen === null && state.outputScreen === null) return state
    
    if (state.outputScreen === null) {
      return {
        ...state,
        operation: payload,
        outputScreen: state.inputScreen,
        inputScreen: null
      }
    }

    if (state.outputScreen && state.inputScreen === null) {
      return {
        ...state,
        operation: payload
      }
    }
    
    return {
      ...state,
      operation: payload,
      outputScreen: makeCalculation(state.operation, state.inputScreen, state.outputScreen),
      inputScreen: null
    }
  default:
    return state
  }
}


function App() {

  const [{inputScreen, outputScreen, operation}, dispatch] = useReducer(reducer, initialState)

  return (
    <main>
      <Screen 
        inputScreen = {inputScreen}
        outputScreen = {outputScreen}
        operation = {operation}
      />
      <Keypad 
        keys = {keys}
        operation = {operation}
        dispatch = {dispatch}
      />
    </main>
  );
}


export default App;
