import { createContext, useContext } from "react";
import type { Todo } from "../../types/todo";

type TodoContextValue = {
  todos: Todo[];
  addTodo: (content: string) => void;
  editTodo: (id: number, content: string) => void;
  removeTodo: (id: number) => void;
  setCompleted: (id: number, completed: boolean) => void;
};

// biome-ignore lint/style/noNonNullAssertion: Use undefined to force errors when used outside of context provider
export const TodoContext = createContext<TodoContextValue>(undefined!);

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Component is not a child of TodoContext.Provider");
  }

  return context;
}
