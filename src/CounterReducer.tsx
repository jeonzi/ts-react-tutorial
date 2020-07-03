import React, { useReducer } from "react"

type Action = { type: "INCREASE" } | { type: "DECREASE" }

function reducer(state: number, action: Action): number {
  // state의 type = return type!!!!!! 상태와 리턴의 타입이 동일하게 설정하는 것이 중요!!
  switch (action.type) {
    case "INCREASE":
      return state + 1
    case "DECREASE":
      return state - 1
    default:
      throw new Error("Unhandeled action")
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0)
  const onIncrease = () => dispatch({ type: "INCREASE" })
  const onDecrease = () => dispatch({ type: "DECREASE" })

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  )
}

export default Counter
