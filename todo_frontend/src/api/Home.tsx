import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, deleteTodo, Todo } from '../api/todoApi';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAdd = async () => {
    if (newTitle.trim()) {
      await createTodo({ title: newTitle });
      setNewTitle('');
      loadTodos();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    loadTodos();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>To-Do List</h1>
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '1rem' }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
