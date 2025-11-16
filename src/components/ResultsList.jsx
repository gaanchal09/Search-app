export default function ResultsList({ results }) {
  if (!results.length) {
    return <p>No results found.</p>;
  }

  return (
    <div>
      {results.map((r) => (
        <div className="result-card" key={r.id}>
          <h3 className="result-title">{r.title}</h3>
          <p className="result-meta">
            {r.project} • {r.team} • {r.type}
          </p>
          <p className="result-body">{r.body}</p>
        </div>
      ))}
    </div>
  );
}
