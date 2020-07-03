import React from "react"
import TodoItem from "./TodoItem"
import { useTodosState } from "../contexts/TodosContext"

// TodoList 컴포넌트에서 Context 안의 상태를 조회하여 내용을 렌더링 함
function TodoList() {
  const todos = useTodosState()
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  )
}

export default TodoList
