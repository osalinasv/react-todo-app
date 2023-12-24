import { Todo } from "@/types/todo";

export function createNewTodo(content: string): Todo {
  return {
    id: new Date().getTime(),
    content,
    completed: false,
  };
}

export function storeTodosInLocalStorage(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

export function loadTodosFromLocalStorage(): Todo[] {
  try {
    const local = localStorage.getItem("todos");
    if (local) return JSON.parse(local);
  } catch (error) {
    console.error(error);
  }

  return [];
}
