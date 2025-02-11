import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoHeader from "./TodoHeader";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodos } from "../hooks/useTodos";

const TodoList = () => {
  const {
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
  } = useTodos();

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }
  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      <TodoHeader />
      <div className="pt-24">
        <TodoForm
          newTodo={newTodo}
          onTodoChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          onAddTodo={handleAddTodo}
          onReset={handleReset}
        />
        <div
          className="px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center transition-all duration-300 ease-out"
          style={{ width: "clamp(400px, 90vw, 1200px)" }}
        >
          {mergedTodos.map((todo) => {
            const isUserTask = todo.user === true;
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                isUserTask={isUserTask}
                editingId={editingId}
                editingValue={editingValue}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onStartEditing={handleStartEditing}
                onCommitEditing={handleCommitEditing}
                onEditChange={(value) => setEditingValue(value)}
                onEditKeyPress={handleEditKeyPress}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoList;