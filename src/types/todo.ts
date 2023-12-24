export type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

export type TodoContextState = {
  todos: Todo[];
  addTodo: (content: string) => void;
  editTodo: (id: number, content: string) => void;
  removeTodo: (id: number) => void;
  setCompleted: (id: number, completed: boolean) => void;
};
