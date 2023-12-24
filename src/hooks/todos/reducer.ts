import {
  createNewTodo,
  loadTodosFromLocalStorage,
  storeTodosInLocalStorage,
} from "@/lib/local";
import type { Todo } from "@/types/todo";
import { useReducer } from "react";

export const ACTIONS = {
  ADD: "add",
  EDIT: "edit",
  REMOVE: "remove",
  SET_COMPLETED: "set-completed",
} as const;

type ActionType = typeof ACTIONS;

type AddAction = {
  type: ActionType["ADD"];
  content: string;
};

type EditAction = {
  type: ActionType["EDIT"];
  id: number;
  content: string;
};

type RemoveAction = {
  type: ActionType["REMOVE"];
  id: number;
};

type SetCompletedAction = {
  type: ActionType["SET_COMPLETED"];
  id: number;
  completed: boolean;
};

type Action = AddAction | EditAction | RemoveAction | SetCompletedAction;

function reduceTodos(todos: Todo[], action: Action) {
  let newTodos = todos;

  switch (action.type) {
    case ACTIONS.ADD:
      newTodos = [createNewTodo(action.content), ...newTodos];
      break;
    case ACTIONS.EDIT:
      newTodos = newTodos.map((todo) => {
        if (todo.id === action.id) {
          todo.content = action.content;
        }

        return todo;
      });
      break;
    case ACTIONS.REMOVE:
      newTodos = newTodos.filter((todo) => todo.id !== action.id);
      break;
    case ACTIONS.SET_COMPLETED:
      newTodos = newTodos.map((todo) => {
        if (todo.id === action.id) {
          todo.completed = action.completed;
        }

        return todo;
      });
      break;
  }

  storeTodosInLocalStorage(newTodos);
  return newTodos;
}

export function useTodoReducer() {
  return useReducer(reduceTodos, null, loadTodosFromLocalStorage);
}
