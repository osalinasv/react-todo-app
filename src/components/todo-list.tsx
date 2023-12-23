import { useTodoContext } from '../hooks/todos/context'
import { TodoItem } from './todo-item'

export function TodoList() {
  console.log('RENDER', 'TodoList')
  const { todos } = useTodoContext()

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem {...todo} />
        </li>
      ))}
    </ul>
  )
}
