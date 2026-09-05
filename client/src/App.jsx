import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { getTasks, createTask, updateTask, toggleTask, deleteTask } from './services/taskApi.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask.id, formData);
        setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
        setEditingTask(null);
      } else {
        const created = await createTask(formData);
        setTasks((prev) => [created, ...prev]);
      }
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(id) {
    try {
      const updated = await toggleTask(id);
      setTasks((prev) => prev.map((task) => (task.id === updated.id ? updated : task)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      if (editingTask?.id === id) {
        setEditingTask(null);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
      </header>

      <main className="app-main">
        <TaskForm
          onSubmit={handleSubmit}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
        />

        {error && <p className="page-error">{error}</p>}

        {loading ? (
          <p className="loading-state">Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}

export default App;
