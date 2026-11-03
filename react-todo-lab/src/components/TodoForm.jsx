import { useRef, useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [due, setDue] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const value = text.trim();
    if (!value) {
      // Restart the shake animation on every empty submit
      setError(false);
      requestAnimationFrame(() => setError(true));
      inputRef.current.focus();
      return;
    }
    onAdd({ text: value, priority, due });
    setText('');
    setDue('');
    setError(false);
    inputRef.current.focus();
  };

  return (
    <form className={`todo-form ${error ? 'todo-form--error' : ''}`} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className="todo-form__input"
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={e => { setText(e.target.value); setError(false); }}
        aria-label="New task"
        maxLength={120}
      />
      <div className="todo-form__row">
        <select value={priority} onChange={e => setPriority(e.target.value)} aria-label="Priority">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input type="date" value={due} onChange={e => setDue(e.target.value)} aria-label="Due date" />
        <button type="submit" className="btn btn--primary">+ Add task</button>
      </div>
      {error && <p className="todo-form__error">Please type a task first.</p>}
    </form>
  );
}
