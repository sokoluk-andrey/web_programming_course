import { useEffect, useMemo, useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import FilterBar from './components/FilterBar.jsx';
import ProgressRing from './components/ProgressRing.jsx';

const STORAGE_KEY = 'taskflow.todos';

// Local YYYY-MM-DD, offset by a number of days from today
function isoDay(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const SAMPLE_TODOS = [
  { id: 1, text: 'Read Laboratory Work N2 task', priority: 'high', due: isoDay(-1), done: true },
  { id: 2, text: 'Build ToDo app with React', priority: 'high', due: isoDay(0), done: false },
  { id: 3, text: 'Push the code to GitHub', priority: 'medium', due: isoDay(2), done: false },
  { id: 4, text: 'Fill in the project passport', priority: 'low', due: '', done: false },
];

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : SAMPLE_TODOS;
  } catch {
    return SAMPLE_TODOS;
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('all');
  const [loaded, setLoaded] = useState(false);

  // Page load event: trigger the intro animation once the app has mounted
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Persist the list so tasks survive a page reload
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = ({ text, priority, due }) => {
    setTodos(prev => [{ id: Date.now(), text, priority, due, done: false }, ...prev]);
  };
  const toggleTodo = id => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };
  const editTodo = (id, text) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text } : t)));
  };
  const removeTodo = id => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };
  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.done));
  };

  const visible = useMemo(() => {
    if (filter === 'active') return todos.filter(t => !t.done);
    if (filter === 'done') return todos.filter(t => t.done);
    return todos;
  }, [todos, filter]);

  const doneCount = todos.filter(t => t.done).length;

  return (
    <div className={`app ${loaded ? 'app--loaded' : ''}`}>
      <header className="app__header">
        <div>
          <h1>Taskflow</h1>
          <p className="app__subtitle">
            {todos.length === 0
              ? 'Nothing planned yet - add your first task.'
              : `${todos.length - doneCount} of ${todos.length} tasks left`}
          </p>
        </div>
        <ProgressRing done={doneCount} total={todos.length} />
      </header>

      <TodoForm onAdd={addTodo} />

      <FilterBar
        filter={filter}
        onChange={setFilter}
        counts={{ all: todos.length, active: todos.length - doneCount, done: doneCount }}
        onClearCompleted={clearCompleted}
      />

      <TodoList todos={visible} filter={filter} onToggle={toggleTodo} onEdit={editTodo} onRemove={removeTodo} />

      <footer className="app__footer">Double-click a task to edit it &middot; Laboratory Work N2</footer>
    </div>
  );
}
