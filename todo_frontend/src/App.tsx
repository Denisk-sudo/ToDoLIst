import { useEffect, useState } from 'react'
import type { Todo } from './api/todoApi.ts'
import { getTodos, addTodo, deleteTodo, toggleTodo } from './api/todoApi.ts'


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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Todo List</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id, !todo.completed)}
              />
              {todo.title}
            </label>
            <button onClick={() => handleDelete(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
