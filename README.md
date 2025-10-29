Todo App

A simple React + Redux Todo Application with search, pagination, and full CRUD functionality, built for learning and demonstration purposes.

Features

Create Todos – Add new tasks with title, content, and tag.

Edit Todos – Modify existing tasks.

Delete Todos – Remove tasks from the list.

Toggle Completion – Mark tasks as completed or not completed.

Search with Debounce – Search tasks efficiently without unnecessary re-renders.

Pagination – Navigate through tasks using React Paginate.

State Management – Uses Redux Toolkit for global state and Redux Persist for persistence.

API Integration – Uses a custom MockAPI backend for storing todos.

Responsive UI – Works on desktop and mobile screens.


Tech Stack

Frontend: React, TypeScript, Formik, CSS Modules

State Management: Redux Toolkit, Redux Persist

API: Axios, MockAPI

Utilities: useDebounce, React Paginate

Installation

Clone the repository:

git clone https://github.com/AlexandraSavenko/test-task-todo-list
cd test-task-todo-list

create .env file and add backend url in it: https://6901c458b208b24affe39de0.mockapi.io/api/v1/

Install dependencies:

npm install


Start the development server:

npm start


Open your browser at http://localhost:3000

Usage

Type in the search bar to filter todos.

Click the “Create todo +” button to add a new todo.

Click on a todo’s edit button to modify it.

Click the delete button to remove a todo.

Click the sticker but the title to mark a todo as completed.

Use the pagination at the bottom to navigate through pages of todos.

Folder Structure (Optional)
src/
 ├─ components/    # Reusable UI components
 ├─ redux/         # Redux slices, store, selectors
 ├─ App.tsx
 └─ main.tsx

Notes

The app uses MockAPI as a backend for demonstration. You can replace it with a real API by changing the api.ts service.

Redux Persist ensures that todos remain in local storage across reloads.

Pagination uses React Paginate with break points to handle small screens.