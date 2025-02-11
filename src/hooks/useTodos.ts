import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Todo } from "../types/todo";
import { fetchTodos, addTodo, deleteTodo } from "../services/todoService";
import { getUserTodos, setUserTodos, getDeletedTodos, setDeletedTodos } from "../utils/localStorage";

export const useTodos = () => {
  const [apiTasks, setApiTasks] = useState<Todo[]>([]);
  const [userTasks, setUserTasks] = useState<Todo[]>(getUserTodos());
  const [newTodo, setNewTodo] = useState<string>("");
  const queryClient = useQueryClient();
  const didSetApiTasksRef = useRef(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  const { data: fetchedApiTodos = [], error, isLoading } = useQuery<Todo[], Error>({
    queryKey: ["apiTodos"],
    queryFn: fetchTodos,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!didSetApiTasksRef.current && fetchedApiTodos.length > 0) {
      const deletedIds = getDeletedTodos();
      const filteredApiTasks = fetchedApiTodos.filter(
        (task) => !deletedIds.includes(task.id)
      );
      setApiTasks(filteredApiTasks);
      didSetApiTasksRef.current = true;
    }
  }, [fetchedApiTodos]);

  useEffect(() => {
    setUserTodos(userTasks);
  }, [userTasks]);

  const mergedTodos = [...userTasks, ...apiTasks];

  const addNewTodoMutation = useMutation<Todo, Error, string, { previousUserTasks: Todo[] }>({
    mutationFn: addTodo,
    onMutate: async (newTodoText: string) => {
      await queryClient.cancelQueries({ queryKey: ["apiTodos"] });
      const previousUserTasks = userTasks;
      const optimisticTodo: Todo = { id: -Date.now(), title: newTodoText, completed: false, user: true };
      setUserTasks((prev) => [optimisticTodo, ...prev]);
      return { previousUserTasks };
    },
    onError: (err, newTodoText, context) => {
      if (context?.previousUserTasks) {
        setUserTasks(context.previousUserTasks);
      }
      toast.error("Failed to add task.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["apiTodos"] });
    },
    onSuccess: (returnedTodo) => {
      const confirmedTodo: Todo = { ...returnedTodo, user: true, id: -Date.now() };
      setUserTasks((prev) => [confirmedTodo, ...prev.filter((todo) => todo.title !== returnedTodo.title)]);
      toast.success("Task added successfully!");
    },
  });

  const removeApiTodo = useMutation<number, Error, number, { previousApiTasks: Todo[] }>({
    mutationFn: deleteTodo,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["apiTodos"] });
      const previousApiTasks = apiTasks;
      setApiTasks((prev) => prev.filter((task) => task.id !== id));
      return { previousApiTasks };
    },
    onError: (err, id, context) => {
      if (context?.previousApiTasks) {
        setApiTasks(context.previousApiTasks);
      }
      toast.error("Failed to delete task.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["apiTodos"] });
    },
    onSuccess: () => {
      toast.success("Task deleted successfully!");
    },
  });

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    addNewTodoMutation.mutate(newTodo);
    setNewTodo("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddTodo();
  };

  const handleDeleteTodo = (id: number, isUserTask: boolean = false) => {
    if (isUserTask) {
      setUserTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!");
    } else {
      removeApiTodo.mutate(id);
      const currentDeleted = getDeletedTodos();
      if (!currentDeleted.includes(id)) {
        const updatedDeleted = [...currentDeleted, id];
        setDeletedTodos(updatedDeleted);
      }
      setApiTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const handleToggleTodo = (id: number, isUserTask: boolean = false) => {
    if (isUserTask) {
      setUserTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
      );
    } else {
      setApiTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
      );
    }
  };

  const handleStartEditing = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditingValue(currentTitle);
  };

  const handleCommitEditing = () => {
    if (editingId === null) return;
    if (userTasks.some((task) => task.id === editingId)) {
      setUserTasks((prev) =>
        prev.map((task) => (task.id === editingId ? { ...task, title: editingValue } : task))
      );
    } else {
      setApiTasks((prev) =>
        prev.map((task) => (task.id === editingId ? { ...task, title: editingValue } : task))
      );
    }
    setEditingId(null);
    setEditingValue("");
    toast.success("Task updated successfully!");
  };

  const handleEditKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommitEditing();
    }
  };

  const handleReset = () => {
    localStorage.removeItem("userTodos");
    localStorage.removeItem("deletedTodos");
    setUserTasks([]);
    didSetApiTasksRef.current = false;
    if (fetchedApiTodos.length > 0) {
      setApiTasks(fetchedApiTodos);
      didSetApiTasksRef.current = true;
    }
    queryClient.invalidateQueries({ queryKey: ["apiTodos"] });
    toast.success("Reset to original state!");
  };

  return {
    newTodo,
    setNewTodo,
    isLoading,
    error,
    mergedTodos,
    editingId,
    editingValue,
    setEditingValue,
    handleAddTodo,
    handleKeyPress,
    handleDeleteTodo,
    handleToggleTodo,
    handleStartEditing,
    handleCommitEditing,
    handleEditKeyPress,
    handleReset,
  };
};