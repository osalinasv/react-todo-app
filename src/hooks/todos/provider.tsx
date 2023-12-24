import { ReactNode } from "react";
import { TodoContext } from "./context";
import { ACTIONS, useTodoReducer } from "./reducer";

export function TodoContextProvider({ children }: { children: ReactNode }) {
  console.log("RENDER", "TodoContextProvider");
  const [todos, dispatch] = useTodoReducer();

  const value = {
    todos,
    addTodo: (content: string) => dispatch({ type: ACTIONS.ADD, content }),
    editTodo: (id: number, content: string) =>
      dispatch({ type: ACTIONS.EDIT, id, content }),
    removeTodo: (id: number) => dispatch({ type: ACTIONS.REMOVE, id }),
    setCompleted: (id: number, completed: boolean) =>
      dispatch({ type: ACTIONS.SET_COMPLETED, id, completed }),
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
