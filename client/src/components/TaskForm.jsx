import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  description: '',
};

function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description || '',
      });
      setError('');
    } else {
      setForm(emptyForm);
    }
  }, [editingTask]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setError('');
      setSubmitting(true);

      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
      });

      if (!editingTask) {
        setForm(emptyForm);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Title</label>

        <div className="input-wrapper">
          <svg
            className="input-icon"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
          >
            <rect
              x="5"
              y="3"
              width="14"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.8"
            />

            <path
              d="M8 8H16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M8 12H16"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M8 16H13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="description">
          Description <span>(optional)</span>
        </label>

        <div className="input-wrapper textarea-wrapper">
          <svg
            className="input-icon textarea-icon"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8 6H21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M8 12H21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M8 18H17"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <circle cx="4" cy="6" r="1" fill="currentColor" />
            <circle cx="4" cy="12" r="1" fill="currentColor" />
            <circle cx="4" cy="18" r="1" fill="currentColor" />
          </svg>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add more detail..."
            rows={3}
          />
        </div>
      </div>

      {error && (
        <p className="form-error">
          <span>!</span>
          {error}
        </p>
      )}

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          <span className="button-plus">
            {editingTask ? '✓' : '+'}
          </span>

          {submitting
            ? 'Saving...'
            : editingTask
              ? 'Save Changes'
              : 'Add Task'}
        </button>

        {editingTask && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
            disabled={submitting}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;