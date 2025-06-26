import { useEffect, useState } from 'react'
import type { Todo } from './api/todoApi'
import { getTodos, addTodo, deleteTodo, toggleTodo } from './api/todoApi'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTitle, setNewTitle] = useState('')

  useEffect(() => {
    getTodos().then(setTodos)
  }, [])

  const handleAdd = async () => {
    if (!newTitle.trim()) return
    const todo = await addTodo(newTitle)
    setTodos([...todos, todo])
    setNewTitle('')
  }

  const handleDelete = async (id: number) => {
    await deleteTodo(id)
    setTodos(todos.filter((t) => t.id !== id))
  }

  const handleToggle = async (id: number, completed: boolean) => {
    const updated = await toggleTodo(id, completed)
    setTodos(todos.map((t) => (t.id === id ? updated : t)))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>📝 Todo List</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="New task..."
          style={{
            flex: 1,
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={handleAdd}
          disabled={!newTitle.trim()}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: newTitle.trim() ? 'pointer' : 'not-allowed',
            opacity: newTitle.trim() ? 1 : 0.5,
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, !todo.completed)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : 'black',
                }}
              >
                {todo.title}
              </span>
            </label>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{
                background: 'none',
                border: 'none',
                color: 'red',
                fontSize: '1.2rem',
                cursor: 'pointer',
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
