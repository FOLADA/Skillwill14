import React, { useState, useCallback } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = useCallback(() => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  }, [inputValue, todos]);

  const toggleTodo = useCallback((index) => {
    const newTodos = todos.map((todo, i) => (
      i === index ? { ...todo, completed: !todo.completed } : todo
    ));
    setTodos(newTodos);
  }, [todos]);

  const Todo = React.memo(({ todo, index }) => (
    <li
      onClick={() => toggleTodo(index)}
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
    >
      {todo.text}
    </li>
  ));

  const TodoList = React.memo(({ todos }) => (
    <ul>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} index={index} />
      ))}
    </ul>
  ));

  return (
    <div>
      <h1>Todo List</h1>
      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button onClick={addTodo}>Add Todo</button>
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
