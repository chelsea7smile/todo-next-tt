import { Todo } from "../types/todo";

const USER_TODOS_KEY = "userTodos";
const DELETED_TODOS_KEY = "deletedTodos";

export const getUserTodos = (): Todo[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(USER_TODOS_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const setUserTodos = (todos: Todo[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_TODOS_KEY, JSON.stringify(todos));
  }
};

export const getDeletedTodos = (): number[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(DELETED_TODOS_KEY);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

export const setDeletedTodos = (ids: number[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(DELETED_TODOS_KEY, JSON.stringify(ids));
  }
};
