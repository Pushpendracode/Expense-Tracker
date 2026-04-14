import { CAT_MAP } from "../utlis/constants";
import { fmtINR } from "../utlis/helpers";

export default function ExpenseItem({ expense, onDelete }) {
  const cat = CAT_MAP[expense.category] || CAT_MAP["Others"];
  return (
    <div
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px", borderRadius: 10, marginBottom: 8,
        background: "#131929", border: "1px solid #232d42",
        transition: "background 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "#161f30"}
      onMouseLeave={e => e.currentTarget.style.background = "#131929"}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, fontSize: 18,
          background: `${cat.color}15`,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${cat.color}25`, flexShrink: 0,
        }}>{cat.icon}</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{
              background: `${cat.color}18`, color: cat.color,
              border: `1px solid ${cat.color}30`,
              borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600,
            }}>{expense.category}</span>
            <span style={{ fontSize: 11, color: "#475569" }}>{expense.date}</span>
          </div>
          <div style={{ fontSize: 13, color: "#94a3b8" }}>
            {expense.note || <span style={{ color: "#475569", fontStyle: "italic" }}>No note</span>}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: "#f1f5f9" }}>
          {fmtINR(expense.amount)}
        </div>
        <button
          onClick={() => onDelete(expense.id)}
          style={{
            background: "#ef444415", border: "1px solid #ef444430",
            color: "#ef4444", borderRadius: 6, padding: "4px 8px",
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#ef444425"}
          onMouseLeave={e => e.currentTarget.style.background = "#ef444415"}
        >✕</button>
      </div>
    </div>
  );
}