import { fmtINR } from "../utlis/helpers";

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1a2235 0%, #1e2a3a 100%)",
      borderRadius: 14, padding: "20px 22px",
      border: `1px solid ${color}30`,
      borderLeft: `3px solid ${color}`,
      flex: 1, minWidth: 140,
    }}>
      <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
      <div style={{
        fontSize: 11, color: "#64748b", fontWeight: 600,
        letterSpacing: 0.5, marginBottom: 4, textTransform: "uppercase"
      }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
    </div>
  );
}

export default function StatCards({ expenses, catTotals }) {
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
      <StatCard label="Total Spent" value={fmtINR(totalSpent)} color="#f59e0b" icon="💰" />
      {catTotals.slice(0, 3).map(c => (
        <StatCard key={c.name} label={`${c.icon} ${c.name}`}
          value={fmtINR(c.total)} color={c.color} icon={c.icon} />
      ))}
    </div>
  );
}