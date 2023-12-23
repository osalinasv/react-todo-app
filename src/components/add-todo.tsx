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
    <form onSubmit={addTodoOnSubmit} className="flex flex-nowrap mb-4 gap-2">
      <input
        ref={input}
        type="text"
        name="newTodo"
        required
        maxLength={50}
        placeholder="Create a new todo item"
        className="grow shrink border rounded h-12 p-2 bg-white shadow-md"
      />
      <button
        type="submit"
        className="flex flex-nowrap items-center gap-1 shrink-0 border rounded h-12 p-2 font-bold text-white bg-indigo-600 shadow-md hover:bg-indigo-600/70 focus-visible:bg-indigo-600/70 transition-colors">
        Add
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-6">
          <path
            fill="currentColor"
            d="M12 21a9 9 0 1 1 9-9a9 9 0 0 1-9 9m0-16.5a7.5 7.5 0 1 0 7.5 7.5A7.5 7.5 0 0 0 12 4.5"
          />
          <path fill="currentColor" d="M12 16.75a.76.76 0 0 1-.75-.75V8a.75.75 0 0 1 1.5 0v8a.76.76 0 0 1-.75.75" />
          <path fill="currentColor" d="M16 12.75H8a.75.75 0 0 1 0-1.5h8a.75.75 0 0 1 0 1.5" />
        </svg>
      </button>
    </form>
  )
}
