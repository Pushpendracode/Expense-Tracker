import { useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { fmtINR } from "../utlis/helpers";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background: "#1a1f2e", border: "1px solid #2d3548",
      borderRadius: 10, padding: "10px 16px", fontSize: 13,
    }}>
      <div style={{ color: d.payload?.color || d.fill, fontWeight: 700 }}>
        {d.name}
      </div>
      <div style={{ color: "#e2e8f0", marginTop: 2 }}>
        {fmtINR(d.value)}
      </div>
    </div>
  );
}

export default function ChartSection({ catTotals, recentDays }) {
  const [chartType, setChartType] = useState("pie");

  const cardStyle = {
    background: "#1a2235", borderRadius: 14,
    padding: "18px 22px", border: "1px solid #2d3548",
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 22 }}>

      {/* LEFT — Pie or Bar chart */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Category Split</div>
          <div style={{ display: "flex", gap: 4 }}>
            {["pie", "bar"].map(t => (
              <button key={t} onClick={() => setChartType(t)}
                style={{
                  padding: "3px 10px", borderRadius: 6,
                  fontSize: 11, fontWeight: 600, cursor: "pointer",
                  border: "1px solid #2d3548",
                  background: chartType === t ? "#f59e0b20" : "transparent",
                  color: chartType === t ? "#f59e0b" : "#64748b",
                }}>
                {t === "pie" ? "🥧 Pie" : "📊 Bar"}
              </button>
            ))}
          </div>
        </div>

        {catTotals.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b", padding: "40px 0", fontSize: 13 }}>
            No data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            {chartType === "pie" ? (
              <PieChart>
                <Pie data={catTotals} dataKey="total" nameKey="name"
                  cx="50%" cy="50%" outerRadius={80} paddingAngle={3}>
                  {catTotals.map(c => <Cell key={c.name} fill={c.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8}
                  formatter={v => (
                    <span style={{ color: "#94a3b8", fontSize: 11 }}>{v}</span>
                  )} />
              </PieChart>
            ) : (
              <BarChart data={catTotals} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2536" />
                <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => `₹${v >= 1000 ? (v / 1000).toFixed(1) + "k" : v}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" radius={[5, 5, 0, 0]}>
                  {catTotals.map(c => <Cell key={c.name} fill={c.color} />)}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        )}
      </div>

      {/* RIGHT — Daily spending bar chart */}
      <div style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
          Daily Spending (Last 7 Days)
        </div>

        {recentDays.length === 0 ? (
          <div style={{ textAlign: "center", color: "#64748b", padding: "40px 0", fontSize: 13 }}>
            No data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={recentDays} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2536" />
              <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }}
                axisLine={false} tickLine={false}
                tickFormatter={v => `₹${v >= 1000 ? (v / 1000).toFixed(1) + "k" : v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="Spent" fill="#3b82f6" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}