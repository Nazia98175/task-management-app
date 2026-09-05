import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
} from './services/taskApi.js';

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
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask.id, formData);

        setTasks((prev) =>
          prev.map((task) =>
            task.id === updated.id ? updated : task
          )
        );

        setEditingTask(null);
      } else {
        const created = await createTask(formData);
        setTasks((prev) => [created, ...prev]);
      }

      setError('');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  }

  async function handleToggle(id) {
    try {
      const updated = await toggleTask(id);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === updated.id ? updated : task
        )
      );

      setError('');
    } catch (err) {
      setError(err.message || 'Failed to update task');
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);

      setTasks((prev) =>
        prev.filter((task) => task.id !== id)
      );

      if (editingTask?.id === id) {
        setEditingTask(null);
      }

      setError('');
    } catch (err) {
      setError(err.message || 'Failed to delete task');
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-mark">
          <svg
            width="38"
            height="38"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="36"
              height="36"
              rx="11"
              fill="url(#logoGradient)"
            />

            <circle
              cx="20"
              cy="20"
              r="9"
              stroke="white"
              strokeWidth="2.5"
            />

            <path
              d="M15.5 20L18.5 23L25 16.5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <defs>
              <linearGradient
                id="logoGradient"
                x1="4"
                y1="4"
                x2="36"
                y2="36"
              >
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div>
          <h1>Task Manager</h1>
          <p>Organize your tasks and get things done</p>
        </div>
      </header>

      <main className="app-main">
        <section className="form-card">
          <div className="section-heading">
            <div className="section-icon purple">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 5V19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
          </div>

          <div className="section-divider" />

          <TaskForm
            onSubmit={handleSubmit}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
        </section>

        {error && (
          <div className="page-error">
            <span>!</span>
            {error}
          </div>
        )}

        <section className="tasks-section">
          <div className="tasks-header">
            <div className="tasks-title">
              <div className="tasks-icon">
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8 6H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 12H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 6H3.01"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 12H3.01"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3 18H3.01"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2>Your Tasks</h2>
            </div>

            <div className="task-count">
              {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
            </div>
          </div>

          {loading ? (
            <div className="state-card">
              <div className="loader" />
              <p>Loading your tasks...</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={handleToggle}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

          {tasks.length > 0 && (
            <div className="progress-info">
              <span>
                {completedCount} of {tasks.length} completed
              </span>

              <div className="progress-track">
                <div
                  className="progress-bar"
                  style={{
                    width: `${(completedCount / tasks.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <span className="heart-icon">♡</span>
        <span>Stay productive and keep going!</span>
        <span>💪</span>
      </footer>
    </div>
  );
}

export default App;