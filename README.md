# Next.js Todo App

A simple Next.js Todo application using React Query, Axios, Tailwind CSS, and React Toastify.

## Features

- **Fetch Todos:** Retrieves todo items from [jsonplaceholder](https://jsonplaceholder.typicode.com/todos).
- **CRUD Operations:** Add, edit, and delete tasks with optimistic updates.
- **Local Storage:** Persists user-created todos in the browser.
- **Responsive Design:** Built with Tailwind CSS for a responsive UI.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- npm (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Installation

1.Clone the repository:

   ```bash
   git clone https://github.com/chelsea7smile/todo-next-tt.git

2.Change directory into the project’s root folder (the repository contains multiple files and directories):

cd todo-next-tt

3.Install dependencies:
Using npm:

```bash
npm install

Using Yarn:

```bash 
yarn


4.Running the Project

To start the development server, run:

Using npm:
npm run dev

Using Yarn:
yarn dev

  Open your browser at http://localhost:3000 to view the app.

  Building for Production

  To create an optimized production build:

Using npm:

```bash
npm run build

Then, to start the production server:

```bash
npm run start

  Technologies Used
    •	Next.js
    •	React Query
    •	Axios
    •	Tailwind CSS
    •	React Toastify

   ` nextjs-todo-app/
  ├── components/
  │   ├── TodoHeader.tsx
  │   ├── TodoForm.tsx
  │   ├── TodoItem.tsx
  │   └── TodoList.tsx
  ├── hooks/
  │   └── useTodos.ts
  ├── pages/
  │   ├── _app.tsx
  │   ├── _document.tsx
  │   └── index.tsx
  ├── services/
  │   └── todoService.ts
  ├── styles/
  │   └── globals.css
  ├── types/
  │   └── todo.ts
  ├── utils/
  │   └── localStorage.ts
  ├── package.json
  ├── next.config.js
  └── README.md `