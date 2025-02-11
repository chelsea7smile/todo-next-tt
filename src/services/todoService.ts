import axios from "axios";
import { Todo } from "../types/todo";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
  return response.data;
};

export const addTodo = async (newTodo: string): Promise<Todo> => {
  const response = await axios.post("https://jsonplaceholder.typicode.com/todos", {
    title: newTodo,
    completed: false,
  });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<number> => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return id;
};