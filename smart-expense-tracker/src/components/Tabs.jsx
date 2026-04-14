export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "dashboard", label: "📊 Dashboard" },
    { key: "expenses",  label: "📋 Expenses"  },
    { key: "analytics", label: "📈 Analytics" },
  ];

  return (
    <div style={{
      display: "flex", gap: 4,
      padding: "16px 28px 0",
      borderBottom: "1px solid #1e2536",
    }}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          style={{
            padding: "8px 20px",
            borderRadius: "8px 8px 0 0",
            fontSize: 13,
            fontWeight: activeTab === tab.key ? 700 : 500,
            cursor: "pointer",
            border: "none",
            background: activeTab === tab.key ? "#1a2235" : "transparent",
            color: activeTab === tab.key ? "#f59e0b" : "#64748b",
            borderBottom: activeTab === tab.key
              ? "2px solid #f59e0b"
              : "2px solid transparent",
            transition: "all 0.2s",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}