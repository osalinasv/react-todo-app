import type { TodoContextState } from "@/types/todo";
import { createContext, useContext } from "react";

// biome-ignore lint/style/noNonNullAssertion: Use undefined to force errors when used outside of context provider
export const TodoContext = createContext<TodoContextState>(undefined!);

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Component is not a child of TodoContext.Provider");
  }

  return context;
}
