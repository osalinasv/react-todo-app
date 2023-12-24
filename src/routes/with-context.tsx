import { AddTodo } from "@/components/add-todo";
import { TodoItemMemo } from "@/components/todo-item";
import { TodoListContainer } from "@/components/todo-list";
import { useTodoContext } from "@/hooks/todos/context";
import { TodoContextProvider } from "@/hooks/todos/provider";
import { Todo } from "@/types/todo";
import { useCallback } from "react";

function AddTodoWithContext() {
  console.log("RENDER", "AddTodoWithContext");
  const { addTodo } = useTodoContext();
  return <AddTodo addTodo={addTodo} />;
}

function TodoItemWithContext(todo: Todo) {
  console.log("RENDER", "TodoItemWithContext");
  const { setCompleted, removeTodo, editTodo } = useTodoContext();

  const onEditTodo = useCallback(
    (content: string) => editTodo(todo.id, content),
    [editTodo, todo.id],
  );

  const onRemoveTodo = useCallback(
    () => removeTodo(todo.id),
    [removeTodo, todo.id],
  );

  const onSetCompleted = useCallback(
    (completed: boolean) => setCompleted(todo.id, completed),
    [setCompleted, todo.id],
  );

  return (
    <TodoItemMemo
      {...todo}
      editTodo={onEditTodo}
      removeTodo={onRemoveTodo}
      setCompleted={onSetCompleted}
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
