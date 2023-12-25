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
      <div className="grid gap-4 max-w-prose mx-auto text-muted-foreground mb-8">
        <p>
          As long as there are no dependency constraints in your project, I'd
          recommend going with Zustand 90% of the time. Not only is the API easy
          to follow, but you get granularity for free.
        </p>
        <p>
          Note how the AddTodo component renders just once in this example. And
          with seldom use of memoization you can achieve atomic renders for each
          todo item as well. At the end of the day memoization is good, as long
          as you use it sparingly and with knowledge.
        </p>
        <p>
          In certain setups, it can be useful to rerun the state's
          initialization function every time the provider is mounted. Since
          Zustand has no provider and lives outside React's lifecycle, the setup
          function runs just once. In this example, this causes Zustands' state
          to not be aware of changes to local storage that were made in the
          other tab.
        </p>
      </div>

      <AddTodoWithZustand />
      <TodoListWithZustand />
    </>
  );
}

export default TodosWithZustand;
