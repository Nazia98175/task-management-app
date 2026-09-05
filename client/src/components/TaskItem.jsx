function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : '';

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-check">
        <button
          type="button"
          className={`checkbox ${
            task.completed ? 'checked' : ''
          }`}
          onClick={() => onToggle(task.id)}
          aria-label={
            task.completed
              ? 'Mark task incomplete'
              : 'Mark task complete'
          }
        >
          {task.completed && (
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 12L10 17L19 7"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>

        {task.description && (
          <p className="task-description">
            {task.description}
          </p>
        )}

        {formattedDate && (
          <div className="task-date">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.7"
              />

              <path
                d="M16 3V7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <path
                d="M8 3V7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <path
                d="M3 10H21"
                stroke="currentColor"
                strokeWidth="1.7"
              />
            </svg>

            <span>{formattedDate}</span>
          </div>
        )}
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="task-btn edit-btn"
          onClick={() => onEdit(task)}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 20H21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M16.5 3.5C17.3284 2.67157 18.6716 2.67157 19.5 3.5C20.3284 4.32843 20.3284 5.67157 19.5 6.5L8 18L3 19L4 14L16.5 3.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Edit
        </button>

        <button
          type="button"
          className="task-btn delete-btn"
          onClick={() => onDelete(task.id)}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 7H20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M10 11V17"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M14 11V17"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            <path
              d="M5 7L6 20H18L19 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            <path
              d="M9 7V4H15V7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>

          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;