import { LS_KEY } from "./constants";

export function loadExpenses() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveExpenses(expenses) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(expenses));
  } catch (err) {
    console.error("Failed to save:", err);
  }
}