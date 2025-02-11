import React from "react";

interface TodoFormProps {
  newTodo: string;
  onTodoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddTodo: () => void;
  onReset: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  newTodo,
  onTodoChange,
  onKeyPress,
  onAddTodo,
  onReset,
}) => {
  return (
    <div className="w-full min-w-[320px] max-w-[1200px] px-4 sm:px-8 md:px-12 lg:px-16 mb-8 flex flex-col items-center">
      <input
        type="text"
        value={newTodo}
        onChange={onTodoChange}
        onKeyPress={onKeyPress}
        placeholder="Enter new task"
        className="w-full p-4 mb-4 border border-gray-200 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-transform duration-200 hover:scale-105 active:scale-105 !hover:bg-gradient-to-r !hover:from-indigo-100 !hover:to-purple-100"
      />
      <button
        onClick={onAddTodo}
        className="w-full p-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-105 text-white font-semibold rounded-lg shadow-md transition-transform duration-200"
      >
        Add
      </button>
      <button
        onClick={onReset}
        className="mt-4 w-full p-4 bg-gray-500 hover:bg-gray-600 active:scale-105 text-white font-semibold rounded-lg shadow-md transition-transform duration-200"
      >
        Reset
      </button>
    </div>
  );
};

export default TodoForm;