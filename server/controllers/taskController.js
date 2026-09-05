const db = require('../database/database');

function serializeTask(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    completed: Boolean(row.completed),
    createdAt: row.createdAt
  };
}

function getAllTasks(req, res, next) {
  try {
    const rows = db.prepare('SELECT * FROM tasks ORDER BY createdAt DESC, id DESC').all();
    res.json(rows.map(serializeTask));
  } catch (err) {
    next(err);
  }
}

function getTaskById(req, res, next) {
  try {
    const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(serializeTask(row));
  } catch (err) {
    next(err);
  }
}

function createTask(req, res, next) {
  try {
    const title = (req.body.title || '').trim();
    const description = (req.body.description || '').trim();

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const result = db
      .prepare('INSERT INTO tasks (title, description) VALUES (?, ?)')
      .run(title, description);

    const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(serializeTask(row));
  } catch (err) {
    next(err);
  }
}

function updateTask(req, res, next) {
  try {
    const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const title = (req.body.title || '').trim();
    const description = (req.body.description || '').trim();

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    db.prepare('UPDATE tasks SET title = ?, description = ? WHERE id = ?').run(
      title,
      description,
      req.params.id
    );

    const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    res.json(serializeTask(row));
  } catch (err) {
    next(err);
  }
}

function toggleTaskCompletion(req, res, next) {
  try {
    const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const newValue = existing.completed ? 0 : 1;
    db.prepare('UPDATE tasks SET completed = ? WHERE id = ?').run(newValue, req.params.id);

    const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    res.json(serializeTask(row));
  } catch (err) {
    next(err);
  }
}

function deleteTask(req, res, next) {
  try {
    const existing = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask
};
