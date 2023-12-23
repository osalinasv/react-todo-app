import { useRef, type FormEvent } from 'react'
import { useTodoContext } from '../hooks/todos/context'

export function AddTodo() {
  console.log('RENDER', 'AddTodo')
  const { addTodo } = useTodoContext()
  const input = useRef<HTMLInputElement>(null)

  const addTodoOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const newTodo = formData.get('newTodo')
    if (!newTodo) return false

    addTodo(newTodo as string)

    if (input.current) {
      input.current.value = ''
    }
  }

  return (
    <form onSubmit={addTodoOnSubmit}>
      <input ref={input} type="text" name="newTodo" />
      <button type="submit">Add</button>
    </form>
  )
}
