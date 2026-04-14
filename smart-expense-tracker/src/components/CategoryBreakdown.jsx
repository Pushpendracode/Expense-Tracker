import { fmtINR } from "../utlis/helpers";

export default function CategoryBreakdown({ catTotals, totalSpent }) {
  const sorted = [...catTotals].sort((a, b) => b.total - a.total);

  return (
    <div style={{
      background: "#1a2235", borderRadius: 14,
      padding: "18px 22px", border: "1px solid #2d3548",
    }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>
        Category Breakdown
      </div>

      {sorted.length === 0 ? (
        <div style={{ color: "#64748b", fontSize: 13, textAlign: "center", padding: 20 }}>
          No expenses yet. Add one to get started!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sorted.map(c => {
            const pct = totalSpent ? (c.total / totalSpent) * 100 : 0;
            return (
              <div key={c.name}>
                {/* Label Row */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>
                    {c.icon} {c.name}
                  </span>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>
                      {pct.toFixed(1)}%
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: c.color }}>
                      {fmtINR(c.total)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ height: 6, background: "#1e2536", borderRadius: 9, overflow: "hidden" }}>
                  <div style={{
                    width: `${pct}%`, height: "100%",
                    background: c.color, borderRadius: 9,
                    transition: "width 0.5s ease",
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}