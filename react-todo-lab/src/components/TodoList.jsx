import TodoItem from './TodoItem.jsx';

const EMPTY_TEXT = {
  all: 'Your list is empty. Enjoy the free time!',
  active: 'All done - nothing left to do.',
  done: 'No completed tasks yet.',
};

export default function TodoList({ todos, filter, onToggle, onEdit, onRemove }) {
  if (todos.length === 0) {
    return <p className="todo-empty">{EMPTY_TEXT[filter]}</p>;
  }
  return (
    <ul className="todo-list">
      {todos.map((todo, i) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={i}
          onToggle={onToggle}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
