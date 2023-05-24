# Todo App

This is a simple Todo App built with React. It allows you to add and manage your todos.

## Getting Started

To get started with the app, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Start the development server: `npm start`
4. Open the app in your browser at `http://localhost:3000`

## Usage

Once the app is running, you can perform the following actions:

- Add a new todo by typing it in the input field and clicking "Add Todo".
- Toggle the completion status of a todo by clicking on it.
- Delete a todo by clicking the "Delete" button next to it.

## Technologies Used

- React
- React Hooks (useReducer, useState)

## Code Overview

The main component of the app is `TodoApp`. It manages the state of todos using the `useReducer` hook and handles user interactions. The reducer function `reducer` defines how the state is updated based on different actions. The `TodoApp` component renders a form for adding new todos, displays the list of todos, and provides functionality to toggle the completion status and delete todos.

