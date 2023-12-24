import { useTodoContext } from "../hooks/todos/context";
import { TodoItem } from "./todo-item";

export function TodoList() {
  console.log("RENDER", "TodoList");
  const { todos } = useTodoContext();
  if (!todos || todos.length === 0) return null;

  return (
    // biome-ignore lint/a11y/noRedundantRoles: Force role due to Tailwind's unstyled list not being read as a list
    <ul className="grid gap-2" role="list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem {...todo} />
        </li>
      ))}
    </ul>
  );
}
