import { useState } from 'react';

const REMOVE_ANIMATION_MS = 350;

function dueLabel(due, done) {
  if (!due) return null;
  // Local date as YYYY-MM-DD (toISOString() would use UTC and be off by a day near midnight)
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const date = new Date(due + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  if (!done && due < today) return { text: `Overdue · ${date}`, cls: 'due--overdue' };
  if (due === today) return { text: 'Today', cls: 'due--today' };
  return { text: date, cls: '' };
}

export default function TodoItem({ todo, index, onToggle, onEdit, onRemove }) {
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  // Play the slide-out animation first, then remove from state
  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(todo.id), REMOVE_ANIMATION_MS);
  };

  const finishEdit = () => {
    const value = draft.trim();
    if (value) onEdit(todo.id, value);
    else setDraft(todo.text);
    setEditing(false);
  };

  const due = dueLabel(todo.due, todo.done);

  return (
    <li
      className={`todo-item priority--${todo.priority} ${todo.done ? 'todo-item--done' : ''} ${removing ? 'todo-item--removing' : ''}`}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <label className="checkbox">
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span className="checkbox__box" aria-hidden="true" />
      </label>

      <div className="todo-item__body">
        {editing ? (
          <input
            className="todo-item__edit"
            value={draft}
            autoFocus
            onChange={e => setDraft(e.target.value)}
            onBlur={finishEdit}
            onKeyDown={e => {
              if (e.key === 'Enter') finishEdit();
              if (e.key === 'Escape') { setDraft(todo.text); setEditing(false); }
            }}
            aria-label="Edit task"
          />
        ) : (
          <span className="todo-item__text" onDoubleClick={() => setEditing(true)} title="Double-click to edit">
            {todo.text}
          </span>
        )}
        <div className="todo-item__meta">
          <span className="tag">{todo.priority}</span>
          {due && <span className={`due ${due.cls}`}>{due.text}</span>}
        </div>
      </div>

      <button className="todo-item__remove" onClick={handleRemove} aria-label={`Delete "${todo.text}"`}>
        &times;
      </button>
    </li>
  );
}
