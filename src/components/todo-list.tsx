import { useTodoContext } from '../hooks/todos/context'
import { TodoItem } from './todo-item'

export function TodoList() {
  console.log('RENDER', 'TodoList')
  const { todos } = useTodoContext()
  if (!todos || todos.length == 0) return null

  return (
    <ul className="grid gap-2" role="list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem {...todo} />
        </li>
      ))}
    </ul>
  )
}
