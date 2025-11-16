import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import Filters from "./components/Filters";
import "./styles.css";

export default function App() {
  const [docs, setDocs] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [fuse, setFuse] = useState(null);

  // Filters
  const [projectFilter, setProjectFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    fetch("/docs.json")
      .then((r) => r.json())
      .then((data) => {
        setDocs(data);

        const f = new Fuse(data, {
          keys: ["title", "body", "tags", "project"],
          includeScore: true,
          threshold: 0.35,
        });

        setFuse(f);
        setResults(data.slice(0, 20));
      });
  }, []);

  useEffect(() => {
    if (!query) {
      setResults(docs.slice(0, 20));
      return;
    }
    if (!fuse) return;

    const res = fuse.search(query).map((r) => r.item);
    setResults(res);
  }, [query, fuse, docs]);

  const handleFilterChange = (field, value) => {
    if (field === "project") setProjectFilter(value);
    if (field === "team") setTeamFilter(value);
    if (field === "type") setTypeFilter(value);
  };

  const finalResults = results
    .filter((r) => !projectFilter || r.project === projectFilter)
    .filter((r) => !teamFilter || r.team === teamFilter)
    .filter((r) => !typeFilter || r.type === typeFilter);

  // ✅ RETURN — everything must be inside this
  return (
    <div className="app-container">

      <div className="search-card">
        <h1 className="title">Internal Search</h1>

        <SearchBar query={query} onChange={setQuery} />

        <Filters
          project={projectFilter}
          team={teamFilter}
          type={typeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      <ResultsList results={finalResults} />
    </div>
  );
}
