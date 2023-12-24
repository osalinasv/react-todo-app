import { AddTodo } from "@/components/add-todo";
import { TodoItemMemo } from "@/components/todo-item";
import { TodoListContainer } from "@/components/todo-list";
import useTodosStore from "@/hooks/todos-zustand";
import { Todo } from "@/types/todo";
import { useCallback } from "react";

function AddTodoWithZustand() {
  console.log("RENDER", "AddTodoWithZustand");
  const addTodo = useTodosStore((s) => s.addTodo);
  return <AddTodo addTodo={addTodo} />;
}

function TodoItemWithZustand(todo: Todo) {
  console.log("RENDER", "TodoItemWithZustand");
  const editTodo = useTodosStore((s) => s.editTodo);
  const removeTodo = useTodosStore((s) => s.removeTodo);
  const setCompleted = useTodosStore((s) => s.setCompleted);

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

function TodoListWithZustand() {
  console.log("RENDER", "TodoListWithZustand");
  const todos = useTodosStore((s) => s.todos);

  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItemWithZustand {...todo} />
        </li>
      ))}
    </TodoListContainer>
  );
}

function TodosWithZustand() {
  console.log("RENDER", "TodosWithZustand");
  return (
    <>
      <AddTodoWithZustand />
      <TodoListWithZustand />
    </>
  );
}

export default TodosWithZustand;
