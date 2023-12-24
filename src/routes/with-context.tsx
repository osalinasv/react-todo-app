import { AddTodo } from "@/components/add-todo";
import { TodoList } from "@/components/todo-list";
import { TodoContextProvider } from "@/hooks/todos/provider";

function TodosWithContext() {
  console.log("RENDER", "TodosWithContext");
  return (
    <TodoContextProvider>
      <AddTodo />
      <TodoList />
    </TodoContextProvider>
  );
}

export default TodosWithContext;
