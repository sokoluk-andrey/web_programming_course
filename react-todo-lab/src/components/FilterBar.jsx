const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
];

export default function FilterBar({ filter, onChange, counts, onClearCompleted }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__tabs" role="tablist">
        {FILTERS.map(f => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={`chip ${filter === f.key ? 'chip--active' : ''}`}
            onClick={() => onChange(f.key)}
          >
            {f.label} <span className="chip__count">{counts[f.key]}</span>
          </button>
        ))}
      </div>
      <button className="btn btn--link" onClick={onClearCompleted} disabled={counts.done === 0}>
        Clear completed
      </button>
    </div>
  );
}
