import { CATEGORIES, SORT_OPTIONS } from "../utlis/constants";

const inputStyle = {
  width: "100%", background: "#0d1117",
  border: "1px solid #2d3548", borderRadius: 8,
  padding: "10px 12px", color: "#e2e8f0",
  fontSize: 13, outline: "none",
};
const labelStyle = {
  fontSize: 11, fontWeight: 600, color: "#64748b",
  letterSpacing: 0.5, marginBottom: 5,
  display: "block", textTransform: "uppercase",
};

export default function FilterBar({ filter, setFilter, search, setSearch, onReset, resultCount, total }) {
  return (
    <div style={{
      background: "#1a2235", borderRadius: 14,
      padding: "18px 22px", border: "1px solid #2d3548", marginBottom: 16,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#94a3b8" }}>
        🔍 Search & Filter
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>

        {/* Search */}
        <div>
          <label style={labelStyle}>Search</label>
          <input style={inputStyle} type="text" placeholder="Search notes..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Category */}
        <div>
          <label style={labelStyle}>Category</label>
          <select style={{ ...inputStyle, cursor: "pointer" }}
            value={filter.category}
            onChange={e => setFilter(f => ({ ...f, category: e.target.value }))}>
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>

        {/* From Date */}
        <div>
          <label style={labelStyle}>From Date</label>
          <input style={inputStyle} type="date" value={filter.from}
            onChange={e => setFilter(f => ({ ...f, from: e.target.value }))} />
        </div>

        {/* To Date */}
        <div>
          <label style={labelStyle}>To Date</label>
          <input style={inputStyle} type="date" value={filter.to}
            onChange={e => setFilter(f => ({ ...f, to: e.target.value }))} />
        </div>

        {/* Min Amount */}
        <div>
          <label style={labelStyle}>Min Amount (₹)</label>
          <input style={inputStyle} type="number" placeholder="0"
            value={filter.minAmt}
            onChange={e => setFilter(f => ({ ...f, minAmt: e.target.value }))} />
        </div>

        {/* Max Amount */}
        <div>
          <label style={labelStyle}>Max Amount (₹)</label>
          <input style={inputStyle} type="number" placeholder="∞"
            value={filter.maxAmt}
            onChange={e => setFilter(f => ({ ...f, maxAmt: e.target.value }))} />
        </div>

        {/* Sort */}
        <div>
          <label style={labelStyle}>Sort By</label>
          <select style={{ ...inputStyle, cursor: "pointer" }}
            value={filter.sort}
            onChange={e => setFilter(f => ({ ...f, sort: e.target.value }))}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Reset */}
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button onClick={onReset}
            style={{
              width: "100%", background: "transparent", color: "#64748b",
              border: "1px solid #2d3548", borderRadius: 9,
              padding: "10px", fontWeight: 600, fontSize: 12, cursor: "pointer",
            }}>
            ↺ Reset Filters
          </button>
        </div>
      </div>

      {/* Result count */}
      <div style={{ fontSize: 12, color: "#64748b" }}>
        Showing{" "}
        <span style={{ color: "#f59e0b", fontWeight: 700 }}>{resultCount}</span> expenses
        {resultCount > 0 && (
          <> · Total: <span style={{ color: "#f59e0b", fontWeight: 700 }}>{total}</span></>
        )}
      </div>
    </div>
  );
}