export default function Filters({ project, team, type, onFilterChange }) {
  return (
    <div className="filter-row">

      <select
        className="filter-select"
        value={project}
        onChange={(e) => onFilterChange("project", e.target.value)}
      >
        <option value="">All Projects</option>
        <option value="Product Launch">Product Launch</option>
        <option value="Brand">Brand</option>
        <option value="Support">Support</option>
      </select>

      <select
        className="filter-select"
        value={team}
        onChange={(e) => onFilterChange("team", e.target.value)}
      >
        <option value="">All Teams</option>
        <option value="Growth">Growth</option>
        <option value="Design">Design</option>
        <option value="Customer Success">Customer Success</option>
      </select>

      <select
        className="filter-select"
        value={type}
        onChange={(e) => onFilterChange("type", e.target.value)}
      >
        <option value="">All Types</option>
        <option value="doc">Document</option>
        <option value="pdf">PDF</option>
      </select>

    </div>
  );
}
