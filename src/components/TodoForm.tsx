import React, { useState } from "react"
import { useTodosDispatch } from "../contexts/TodosContext"

// 새로운 Todo 항목을 등록하는 컴포넌트
// input value값은 useState를 통해 관리
// submit 이벤트 발생시 새 항목 생성하고 value값 초기화

function TodoForm() {
  const [value, setValue] = useState("")
  const dispatch = useTodosDispatch()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({
      type: "CREATE",
      text: value,
    })
    setValue("")
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        value={value}
        placeholder="What do you do?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button>등록</button>
    </form>
  )
}

export default TodoForm
