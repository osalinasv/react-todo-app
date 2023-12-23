import { FormEvent, useState } from 'react'
import { useTodoContext } from '../hooks/todos/context'
import type { Todo } from '../types/todo'

type TodoItemProps = Todo & {
  setEditing: (editing: boolean) => void
}

function DisplayTodoItem({ id, content, completed, setEditing }: TodoItemProps) {
  console.log('RENDER', 'DisplayTodoItem', id)
  const { setCompleted, removeTodo } = useTodoContext()

  return (
    <div>
      <label>
        <input type="checkbox" checked={completed} onChange={() => setCompleted(id, !completed)} />
        <span>{content}</span>
      </label>

      <button type="button" onClick={() => removeTodo(id)}>
        Remove
      </button>
      <button type="button" onClick={() => setEditing(true)}>
        Edit
      </button>
    </div>
  )
}

function EditTodoItem({ id, content, setEditing }: TodoItemProps) {
  console.log('RENDER', 'EditTodoItem', id)
  const { editTodo } = useTodoContext()

  const onEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const newContent = formData.get('content')
    if (!newContent) return false

    editTodo(id, newContent as string)
    setEditing(false)
  }

  return (
    <form onSubmit={onEditSubmit}>
      <input type="text" name="content" defaultValue={content} autoFocus />
      <button type="submit">Confirm</button>
      <button type="button" onClick={() => setEditing(false)}>
        Cancel
      </button>
    </form>
  )
}

export function TodoItem(todo: Todo) {
  console.log('RENDER', 'TodoItem', todo.id)
  const [editing, setEditing] = useState(false)
  return editing ? (
    <EditTodoItem setEditing={setEditing} {...todo} />
  ) : (
    <DisplayTodoItem setEditing={setEditing} {...todo} />
  )
}
