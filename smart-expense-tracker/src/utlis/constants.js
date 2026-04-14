export const CATEGORIES = [
  { name: "Food",          icon: "🍜", color: "#f59e0b" },
  { name: "Travel",        icon: "✈️",  color: "#3b82f6" },
  { name: "Bills",         icon: "📋", color: "#ef4444" },
  { name: "Shopping",      icon: "🛍️", color: "#8b5cf6" },
  { name: "Health",        icon: "💊", color: "#10b981" },
  { name: "Entertainment", icon: "🎬", color: "#f97316" },
  { name: "Others",        icon: "📦", color: "#6b7280" },
];

export const CAT_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.name, c])
);

export const LS_KEY = "smart_expenses_v1";

export const SORT_OPTIONS = [
  { value: "date_desc", label: "Newest First" },
  { value: "date_asc",  label: "Oldest First" },
  { value: "amt_desc",  label: "Highest Amount" },
  { value: "amt_asc",   label: "Lowest Amount" },
];