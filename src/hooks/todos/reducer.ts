import { useReducer } from 'react'
import type { Todo } from '../../types/todo'

export const ACTIONS = {
  ADD: 'add',
  EDIT: 'edit',
  REMOVE: 'remove',
  SET_COMPLETED: 'set-completed',
} as const

type ActionType = typeof ACTIONS

type AddAction = {
  type: ActionType['ADD']
  content: string
}

type EditAction = {
  type: ActionType['EDIT']
  id: number
  content: string
}

type RemoveAction = {
  type: ActionType['REMOVE']
  id: number
}

type SetCompletedAction = {
  type: ActionType['SET_COMPLETED']
  id: number
  completed: boolean
}

type Action = AddAction | EditAction | RemoveAction | SetCompletedAction

function reduceTodos(todos: Todo[], action: Action) {
  let newTodos = todos

  switch (action.type) {
    case ACTIONS.ADD:
      newTodos = [{ id: new Date().getTime(), content: action.content, completed: false }, ...newTodos]
      break
    case ACTIONS.EDIT:
      newTodos = newTodos.map((todo) => {
        if (todo.id === action.id) {
          todo.content = action.content
        }

        return todo
      })
      break
    case ACTIONS.REMOVE:
      newTodos = newTodos.filter((todo) => todo.id !== action.id)
      break
    case ACTIONS.SET_COMPLETED:
      newTodos = newTodos.map((todo) => {
        if (todo.id === action.id) {
          todo.completed = action.completed
        }

        return todo
      })
      break
  }

  localStorage.setItem('todos', JSON.stringify(newTodos))
  return newTodos
}

function loadTodosFromLocalStorage(): Todo[] {
  try {
    const local = localStorage.getItem('todos')
    if (local) return JSON.parse(local)
  } catch (error) {
    console.error(error)
  }

  return []
}

export function useTodoReducer() {
  return useReducer(reduceTodos, null, loadTodosFromLocalStorage)
}
