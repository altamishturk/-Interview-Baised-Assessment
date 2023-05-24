import React, { useReducer, useState } from 'react';
import "./style.css";

// Reducer function to manage the state
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      dispatch({ type: 'ADD_TODO', payload: newTodo });
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form className='add-todo' onSubmit={handleAddTodo}>
        <input placeholder='Add..' type="text" value={newTodo} onChange={handleInputChange} />
        <button type="submit">Add Todo</button>
      </form>
      <div className='todo-container'>
        {todos.map(todo => (
          <div
            className='todo'
            key={todo.id}
          >
            <div style={{opacity:todo.completed ? .2 : 1 }}>{todo.text}</div>
            <div className='buttons'>
                <button onClick={() => handleToggleTodo(todo.id)}>{todo.completed? "Un-Complete":"Complete"}</button>
                {
                  !todo.completed &&  <button style={{opacity:todo.completed ? .2 : 1 }} onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                }
               
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
