import React, { createContext, Dispatch, useReducer, useContext } from "react"

// 나중에 다른 컴포넌트에서 타입을 불러와서 쓸 수 있도록 내보냄
export type Todo = {
  id: number
  text: string
  done: boolean
}

type TodosState = Todo[]

// context를 만들때는 createContext 함수의 Generic<>을 사용하여 Context에서 관리하는 값의 상태(type)을 설정해 줄 수 있다
const TodosStateContext = createContext<TodosState | undefined>(undefined)

type Action =
  | { type: "CREATE"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "REMOVE"; id: number }

type TodosDispatch = Dispatch<Action>
const TodosDispatchContext = createContext<TodosDispatch | undefined>(undefined)

// 할 일 관리하는 Reducer
function todosReducer(state: TodosState, action: Action): TodosState {
  switch (action.type) {
    case "CREATE":
      const nextId = Math.max(...state.map((todo) => todo.id)) + 1
      return state.concat({
        id: nextId,
        text: action.text,
        done: false,
      })
    case "TOGGLE":
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo))
    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id)
    default:
      throw new Error("Unhandeled action")
  }
}

// 나중에 App에서 불러와서 기존 내용을 감싸 주어야 하므로 export 해야한다
export function TodosContextProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todosReducer, [
    {
      id: 1,
      text: "Context API 배우기",
      done: true,
    },
    {
      id: 2,
      text: "TypeScript 배우기",
      done: true,
    },
    {
      id: 3,
      text: "TypeScript React와 Context API 함께 사용하기",
      done: false,
    },
  ])

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>{children}</TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  )
}

// custom Hooks
// useContext를 할 때는 해당 값이 유효한지 항상 사용하기 전에 확인해줘야 한다!!!!
// --> 함수 내부에서 필요한 값이 유요하지 않다면 Error를 thorw해서 각 Hook이 반환하는 값의 타입은 언제나 유효하다는 것을 보장받을 수 있다.
export function useTodosState() {
  const state = useContext(TodosStateContext)
  if (!state) throw new Error("TodosProvider not found")
  return state
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext)
  if (!dispatch) throw new Error("TodosProvider not found")
  return dispatch
}
