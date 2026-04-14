export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div
      onClick={e => e.target === e.currentTarget && onCancel()}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200, backdropFilter: "blur(4px)",
      }}
    >
      <div style={{
        background: "#1a2235", borderRadius: 16, padding: "28px",
        border: "1px solid #2d3548", width: "100%", maxWidth: 340,
        textAlign: "center", boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", marginBottom: 8 }}>
          Delete Expense?
        </div>
        <div style={{ fontSize: 13, color: "#64748b", marginBottom: 22 }}>
          This action cannot be undone.
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel}
            style={{
              flex: 1, background: "transparent", color: "#64748b",
              border: "1px solid #2d3548", borderRadius: 9,
              padding: "11px", fontWeight: 600, fontSize: 13, cursor: "pointer",
            }}>
            Cancel
          </button>
          <button onClick={onConfirm}
            style={{
              flex: 1, background: "linear-gradient(135deg,#ef4444,#dc2626)",
              color: "#fff", border: "none", borderRadius: 9,
              padding: "11px", fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}