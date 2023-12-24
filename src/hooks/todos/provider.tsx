import { ReactNode, useCallback } from "react";
import { TodoContext } from "./context";
import { ACTIONS, useTodoReducer } from "./reducer";

export function TodoContextProvider({ children }: { children: ReactNode }) {
  console.log("RENDER", "TodoContextProvider");
  const [todos, dispatch] = useTodoReducer();

  const value = {
    todos,
    addTodo: useCallback(
      (content: string) => dispatch({ type: ACTIONS.ADD, content }),
      [dispatch],
    ),
    editTodo: useCallback(
      (id: number, content: string) =>
        dispatch({ type: ACTIONS.EDIT, id, content }),
      [dispatch],
    ),
    removeTodo: useCallback(
      (id: number) => dispatch({ type: ACTIONS.REMOVE, id }),
      [dispatch],
    ),
    setCompleted: useCallback(
      (id: number, completed: boolean) =>
        dispatch({ type: ACTIONS.SET_COMPLETED, id, completed }),
      [dispatch],
    ),
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
