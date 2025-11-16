export default function SearchBar({ query, onChange }) {
  return (
    <input
      className="search-input"
      placeholder="Search anything..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
