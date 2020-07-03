import React, { useState, useRef } from "react"

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void
}

function MyForm({ onSubmit }: MyFormProps) {
  const inputRef = useRef<HTMLInputElement>(null) // useRef는 Generic을 통해 type을 추정할 수 있다

  const [form, setForm] = useState({
    name: "",
    description: "",
  })

  const { name, description } = form

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  } // e 값을 무엇으로 설정해야 할 지 모를때는 any로 설정

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
    setForm({
      name: "",
      description: "",
    })
    if (!inputRef.current) {
      // 추가적으로, inputRef.current 안의 값을 사용 하려면 null 체킹을 해주어야 합니다.
      // 즉, 특정 값이 정말 유효한지 유효하지 않은지 체크하는건데요, 타입스크립트에서 만약 어떤 타입이 undefined 이거나 null 일 수 있는 상황에는, 해당 값이 유효한지 체킹하는 작업을 꼭 해주어야 자동완성도 잘 이루어지고, 오류도 사라집니다.
      return
    }
    inputRef.current.focus()
    // null checking 관련해서 assertion operator ! 을 사용해서 좀 더 단순하게 코드를 작성할 수 있더라구요!
    // inputRef.current!.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} ref={inputRef} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  )
}

export default MyForm
