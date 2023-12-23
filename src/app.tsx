import { AddTodo } from './components/add-todo'
import { TodoList } from './components/todo-list'
import { TodoContextProvider } from './hooks/todos/provider'

function App() {
  console.log('RENDER', 'App')
  return (
    <TodoContextProvider>
      <AddTodo />
      <TodoList />
    </TodoContextProvider>
  )
}

export default App
