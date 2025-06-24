const API_URL = import.meta.env.VITE_API_URL

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/todos/`)
  return res.json()
}

export async function addTodo(title: string): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  })
  return res.json()
}

export async function deleteTodo(id: number): Promise<void> {
  await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' })
}

export async function toggleTodo(id: number, completed: boolean): Promise<Todo> {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  })
  return res.json()
}
