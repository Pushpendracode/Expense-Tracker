import { CATEGORIES } from "../utlis/constants";

export default function AddExpenseModal({ form, setForm, errors, onAdd, onClose }) {
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

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200, backdropFilter: "blur(4px)",
      }}
    >
      <div style={{
        background: "#1a2235", borderRadius: 16, padding: "28px",
        border: "1px solid #2d3548", width: "100%", maxWidth: 420,
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#f1f5f9" }}>Add Expense</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Track your spending</div>
          </div>
          <button onClick={onClose}
            style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20 }}>
            ✕
          </button>
        </div>

        {/* Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

          {/* Amount */}
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Amount (₹) *</label>
            <input type="number" placeholder="0.00" value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              style={{ ...inputStyle, borderColor: errors.amount ? "#ef4444" : "#2d3548" }}
            />
            {errors.amount && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors.amount}</div>}
          </div>

          {/* Category */}
          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              style={{ ...inputStyle, cursor: "pointer" }}>
              {CATEGORIES.map(c => (
                <option key={c.name} value={c.name}>{c.icon} {c.name}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label style={labelStyle}>Date *</label>
            <input type="date" value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              style={{ ...inputStyle, borderColor: errors.date ? "#ef4444" : "#2d3548" }}
            />
            {errors.date && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors.date}</div>}
          </div>

          {/* Note */}
          <div style={{ gridColumn: "1/-1" }}>
            <label style={labelStyle}>Note</label>
            <input type="text" placeholder="What was this for?" value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Category Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
          {CATEGORIES.map(c => (
            <button key={c.name} onClick={() => setForm(f => ({ ...f, category: c.name }))}
              style={{
                padding: "5px 10px", borderRadius: 8, fontSize: 11,
                fontWeight: 600, cursor: "pointer",
                border: `1px solid ${c.color}${form.category === c.name ? "80" : "20"}`,
                background: form.category === c.name ? `${c.color}20` : "transparent",
                color: form.category === c.name ? c.color : "#64748b",
                transition: "all 0.15s",
              }}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button onClick={onClose}
            style={{
              flex: 1, background: "transparent", color: "#64748b",
              border: "1px solid #2d3548", borderRadius: 9,
              padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer",
            }}>
            Cancel
          </button>
          <button onClick={onAdd}
            style={{
              flex: 2, background: "linear-gradient(135deg,#f59e0b,#d97706)",
              color: "#0d1117", border: "none", borderRadius: 9,
              padding: "11px", fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>
            Add Expense →
          </button>
        </div>
      </div>
    </div>
  );
}