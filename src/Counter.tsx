import React, { useState } from "react"

function Counter() {
  const [count, setCount] = useState<number>(78)
  // 해당 상태가 어떤 타입을 갖고 있는지 설정(Generics)
  // useState를 사용할때는 Generics 사용하지 않아도 알아사 타입을 유추하기 때문에 생략해도 무방하나,
  // 상태가 null일 수도 있고 아닐 수도 있는 경우 Generics을 활용하면 좋다
  const onIncrease = () => setCount(count + 1)
  const onDecrease = () => setCount(count - 1)

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
