import { useState, useEffect, useMemo } from "react";

// Utils
import { CATEGORIES } from "./utlis/constants";
import { uid, fmtINR, today } from "./utlis/helpers";
import { loadExpenses, saveExpenses } from "./utlis/storage";
import { SEED_DATA } from "./utlis/seedData";

// Components
import Tabs from "./components/Tabs";
import StatCards from "./components/StatCards";
import AddExpenseModal from "./components/AddExpenseModal";
import DeleteModal from "./components/DeleteModal";
import FilterBar from "./components/FilterBar";
import ExpenseItem from "./components/ExpenseItem";
import ChartSection from "./components/ChartSection";
import CategoryBreakdown from "./components/CategoryBreakdown";

export default function App() {

  // ── STATE ──────────────────────────────────────────────
  const [expenses, setExpenses] = useState(() => {
    const saved = loadExpenses();
    return saved || SEED_DATA;
  });

  const [form, setForm] = useState({
    amount: "", category: "Food", date: today(), note: "",
  });

  const [errors, setErrors]     = useState({});
  const [search, setSearch]     = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast]       = useState(null);

  const [filter, setFilter] = useState({
    category: "All", from: "", to: "",
    minAmt: "", maxAmt: "", sort: "date_desc",
  });

  // ── AUTO SAVE ──────────────────────────────────────────
  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  // ── COMPUTED DATA ──────────────────────────────────────

  // Total of all expenses
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Category wise totals
  const catTotals = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return CATEGORIES
      .map(c => ({ ...c, total: map[c.name] || 0 }))
      .filter(c => c.total > 0);
  }, [expenses]);

  // Last 7 days for bar chart
  const recentDays = useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      map[e.date] = (map[e.date] || 0) + e.amount;
    });
    return Object.entries(map)
      .sort(([a], [b]) => b.localeCompare(a))
      .slice(0, 7)
      .reverse()
      .map(([date, total]) => ({ date: date.slice(5), total }));
  }, [expenses]);

  // Filtered & sorted expenses
  const filtered = useMemo(() => {
    let list = [...expenses];
    if (filter.category !== "All")
      list = list.filter(e => e.category === filter.category);
    if (filter.from)
      list = list.filter(e => e.date >= filter.from);
    if (filter.to)
      list = list.filter(e => e.date <= filter.to);
    if (filter.minAmt)
      list = list.filter(e => e.amount >= +filter.minAmt);
    if (filter.maxAmt)
      list = list.filter(e => e.amount <= +filter.maxAmt);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.note.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      if (filter.sort === "date_desc") return b.date.localeCompare(a.date);
      if (filter.sort === "date_asc")  return a.date.localeCompare(b.date);
      if (filter.sort === "amt_desc")  return b.amount - a.amount;
      if (filter.sort === "amt_asc")   return a.amount - b.amount;
      return 0;
    });
    return list;
  }, [expenses, filter, search]);

  // ── HANDLERS ───────────────────────────────────────────

  const validate = () => {
    const e = {};
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0)
      e.amount = "Enter a valid positive amount";
    if (!form.date)
      e.date = "Please pick a date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    const entry = {
      id: uid(),
      amount: +form.amount,
      category: form.category,
      date: form.date,
      note: form.note.trim(),
    };
    setExpenses(prev => [entry, ...prev]);
    setForm({ amount: "", category: "Food", date: today(), note: "" });
    setErrors({});
    setShowForm(false);
    showToast("✅ Expense added!");
  };

  const handleDelete = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    setDeleteId(null);
    showToast("🗑️ Expense deleted");
  };

  const handleResetFilters = () => {
    setFilter({ category: "All", from: "", to: "", minAmt: "", maxAmt: "", sort: "date_desc" });
    setSearch("");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  // ── DASHBOARD TAB ───────────────────────────────────────
  const DashboardTab = () => (
    <div>
      <StatCards expenses={expenses} catTotals={catTotals} />
      <ChartSection catTotals={catTotals} recentDays={recentDays} />
      <CategoryBreakdown catTotals={catTotals} totalSpent={totalSpent} />
    </div>
  );

  // ── EXPENSES TAB ────────────────────────────────────────
  const ExpensesTab = () => (
    <div>
      <FilterBar
        filter={filter} setFilter={setFilter}
        search={search} setSearch={setSearch}
        onReset={handleResetFilters}
        resultCount={filtered.length}
        total={fmtINR(filtered.reduce((s, e) => s + e.amount, 0))}
      />
      {filtered.length === 0 ? (
        <div style={{
          background: "#1a2235", borderRadius: 14, padding: 40,
          border: "1px solid #2d3548", textAlign: "center",
        }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🔍</div>
          <div style={{ color: "#64748b", fontSize: 14 }}>
            No expenses match your filters
          </div>
        </div>
      ) : (
        filtered.map(exp => (
          <ExpenseItem
            key={exp.id}
            expense={exp}
            onDelete={(id) => setDeleteId(id)}
          />
        ))
      )}
    </div>
  );

  // ── ANALYTICS TAB ───────────────────────────────────────
  const AnalyticsTab = () => {
    const sorted = [...catTotals].sort((a, b) => b.total - a.total);
    const avgPerDay = (() => {
      if (!expenses.length) return 0;
      const dates = [...new Set(expenses.map(e => e.date))];
      return totalSpent / dates.length;
    })();
    const maxExpense = expenses.length
      ? Math.max(...expenses.map(e => e.amount)) : 0;
    const topCat = sorted[0] || null;

    return (
      <div>
        {/* Stat Row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
          {[
            { label: "Avg Per Day",     value: fmtINR(avgPerDay),  color: "#3b82f6", icon: "📅" },
            { label: "Largest Expense", value: fmtINR(maxExpense), color: "#ef4444", icon: "💸" },
            { label: "Top Category",    value: topCat ? `${topCat.icon} ${topCat.name}` : "N/A", color: topCat?.color || "#64748b", icon: "🏆" },
            { label: "Total Entries",   value: expenses.length,    color: "#10b981", icon: "📝" },
          ].map(s => (
            <div key={s.label} style={{
              background: "linear-gradient(135deg,#1a2235 0%,#1e2a3a 100%)",
              borderRadius: 14, padding: "20px 22px",
              border: `1px solid ${s.color}30`,
              borderLeft: `3px solid ${s.color}`,
              flex: 1, minWidth: 140,
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, letterSpacing: 0.5, marginBottom: 4, textTransform: "uppercase" }}>
                {s.label}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Category List */}
        <div style={{ background: "#1a2235", borderRadius: 14, padding: "18px 22px", border: "1px solid #2d3548" }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>
            Full Category Analysis
          </div>
          {sorted.length === 0 ? (
            <div style={{ color: "#64748b", textAlign: "center", padding: 20, fontSize: 13 }}>
              No data yet
            </div>
          ) : sorted.map((c, i) => {
            const pct = totalSpent ? (c.total / totalSpent) * 100 : 0;
            const count = expenses.filter(e => e.category === c.name).length;
            return (
              <div key={c.name} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 16px", background: "#131929",
                borderRadius: 10, border: `1px solid ${c.color}20`,
                marginBottom: 10,
              }}>
                <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, width: 20 }}>
                  #{i + 1}
                </div>
                <div style={{
                  width: 38, height: 38, borderRadius: 9, fontSize: 18,
                  background: `${c.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: `1px solid ${c.color}25`, flexShrink: 0,
                }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: c.color }}>
                      {fmtINR(c.total)}
                    </span>
                  </div>
                  <div style={{ height: 5, background: "#1e2536", borderRadius: 9, overflow: "hidden", marginBottom: 5 }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: c.color, borderRadius: 9 }} />
                  </div>
                  <div style={{ fontSize: 11, color: "#475569" }}>
                    {pct.toFixed(1)}% · {count} transaction{count !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── RENDER ──────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0d1117 0%,#161b27 60%,#0d1117 100%)",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      paddingBottom: 60,
    }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(90deg,#0f1623 0%,#1a2235 100%)",
        borderBottom: "1px solid #2d3548",
        padding: "18px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#f59e0b,#d97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
          }}>💰</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: "#f1f5f9" }}>
              ExpenseIQ
            </div>
            <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1 }}>
              SMART TRACKER
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#64748b" }}>TOTAL SPENT</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>
              {fmtINR(totalSpent)}
            </div>
          </div>
          <button onClick={() => setShowForm(true)}
            style={{
              background: "linear-gradient(135deg,#f59e0b,#d97706)",
              color: "#0d1117", border: "none", borderRadius: 10,
              padding: "9px 18px", fontWeight: 700, fontSize: 13,
              cursor: "pointer", boxShadow: "0 4px 14px rgba(245,158,11,0.3)",
            }}>
            + Add Expense
          </button>
        </div>
      </div>

      {/* TABS */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* CONTENT */}
      <div style={{ padding: "24px 28px", maxWidth: 1100, margin: "0 auto" }}>
        {activeTab === "dashboard" && <DashboardTab />}
        {activeTab === "expenses"  && <ExpensesTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>

      {/* MODALS */}
      {showForm && (
        <AddExpenseModal
          form={form} setForm={setForm} errors={errors}
          onAdd={handleAdd}
          onClose={() => { setShowForm(false); setErrors({}); }}
        />
      )}
      {deleteId && (
        <DeleteModal
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%",
          transform: "translateX(-50%)",
          background: "#1a2235", border: "1px solid #f59e0b40",
          color: "#f1f5f9", borderRadius: 10, padding: "12px 22px",
          fontSize: 13, fontWeight: 500, zIndex: 300,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          animation: "slideUp 0.3s ease", whiteSpace: "nowrap",
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}