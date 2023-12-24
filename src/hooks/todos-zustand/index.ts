import {
  createNewTodo,
  loadTodosFromLocalStorage,
  storeTodosInLocalStorage,
} from "@/lib/local";
import { TodoContextState } from "@/types/todo";
import { create } from "zustand";

const useTodosStore = create<TodoContextState>((set) => {
  const todos = loadTodosFromLocalStorage();

  return {
    todos,
    addTodo: (content: string) =>
      set((state) => ({ todos: [createNewTodo(content), ...state.todos] })),
    editTodo: (id: number, content: string) =>
      set((state) => ({
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            todo.content = content;
          }

          return todo;
        }),
      })),
    removeTodo: (id: number) =>
      set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
    setCompleted: (id: number, completed: boolean) =>
      set((state) => ({
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            todo.completed = completed;
          }

          return todo;
        }),
      })),
  };
});

useTodosStore.subscribe((state) => {
  storeTodosInLocalStorage(state.todos);
});

export default useTodosStore;
