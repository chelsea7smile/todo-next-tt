import React from "react";

const TodoHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50 p-4 text-center">
      <h1 className="text-5xl font-bold text-gray-800 hover:scale-105 transition-transform duration-200 active:scale-105">
        Todo List
      </h1>
    </header>
  );
};

export default TodoHeader;