import React from "react";
import { Todo, TodoItemProps } from "../types/todo";

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  isUserTask,
  editingId,
  editingValue,
  onToggle,
  onDelete,
  onStartEditing,
  onCommitEditing,
  onEditChange,
  onEditKeyPress,
}) => {
  return (
    <div
      onDoubleClick={() => onToggle(todo.id, isUserTask)}
      className={`relative w-full p-4 mb-4 border border-gray-200 rounded-lg cursor-pointer flex items-center flex-wrap transition-all duration-300 ease-out ${
        !todo.completed ? "hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100" : ""
      }`}
    >
      <div className="flex-1 relative pr-20">
        {editingId === todo.id ? (
          <input
            value={editingValue}
            onChange={(e) => onEditChange(e.target.value)}
            onBlur={onCommitEditing}
            onKeyPress={onEditKeyPress}
            className="w-full p-1 border border-gray-300 rounded text-gray-800"
            autoFocus
          />
        ) : (
          <span className={todo.completed ? "text-gray-500" : "text-gray-800"}>
            {todo.title}
          </span>
        )}
        <div
          className="absolute right-0 top-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 origin-right transition-all duration-300"
          style={{ width: todo.completed ? "100%" : "0%" }}
        />
      </div>
      <div className="flex space-x-2">
        {!todo.completed && (
          <button
            onClick={() => onStartEditing(todo.id, todo.title)}
            className="p-2 bg-blue-500 opacity-50 hover:opacity-100 hover:bg-blue-600 active:scale-105 text-white rounded-lg transition-transform duration-200"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id, isUserTask)}
          className={`p-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 active:scale-105 text-white rounded-lg transition-transform duration-200 ${
            !todo.completed ? "opacity-50 hover:opacity-100" : ""
          }`}
        >
          Delete
        </button>
      </div>
      <div
        className="absolute left-2 top-2 text-[0.55rem] font-bold px-1 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded transition-opacity duration-300"
        style={{
          opacity: todo.completed ? 1 : 0,
          transitionDelay: todo.completed ? "0.5s" : "0s",
        }}
      >
        COMPLETED
      </div>
    </div>
  );
};

export default TodoItem;