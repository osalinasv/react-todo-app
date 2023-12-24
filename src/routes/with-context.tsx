import { AddTodo } from "@/components/add-todo";
import { TodoItem } from "@/components/todo-item";
import { TodoListContainer } from "@/components/todo-list";
import { useTodoContext } from "@/hooks/todos/context";
import { TodoContextProvider } from "@/hooks/todos/provider";
import { Todo } from "@/types/todo";

function AddTodoWithContext() {
  console.log("RENDER", "AddTodoWithContext");
  const { addTodo } = useTodoContext();
  return <AddTodo addTodo={addTodo} />;
}

function TodoItemWithContext(todo: Todo) {
  console.log("RENDER", "TodoItemWithContext");
  const { setCompleted, removeTodo, editTodo } = useTodoContext();

  return (
    <TodoItem
      {...todo}
      editTodo={(c) => editTodo(todo.id, c)}
      removeTodo={() => removeTodo(todo.id)}
      setCompleted={(c) => setCompleted(todo.id, c)}
    />
  );
}

function TodoListWithContext() {
  console.log("RENDER", "TodoListWithContext");
  const { todos } = useTodoContext();

  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItemWithContext {...todo} />
        </li>
      ))}
    </TodoListContainer>
  );
}

function TodosWithContext() {
  console.log("RENDER", "TodosWithContext");
  return (
    <TodoContextProvider>
      <AddTodoWithContext />
      <TodoListWithContext />
    </TodoContextProvider>
  );
}

export default TodosWithContext;
