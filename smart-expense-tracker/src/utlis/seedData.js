import { uid } from "./helpers";

export const SEED_DATA = [
  { id: uid(), amount: 450,  category: "Food",          date: "2026-04-10", note: "Lunch at Dhaba" },
  { id: uid(), amount: 1200, category: "Travel",        date: "2026-04-09", note: "Auto + cab rides" },
  { id: uid(), amount: 3500, category: "Bills",         date: "2026-04-07", note: "Electricity bill" },
  { id: uid(), amount: 890,  category: "Shopping",      date: "2026-04-06", note: "New T-shirt" },
  { id: uid(), amount: 300,  category: "Health",        date: "2026-04-05", note: "Pharmacy" },
  { id: uid(), amount: 600,  category: "Entertainment", date: "2026-04-04", note: "Movie tickets" },
  { id: uid(), amount: 750,  category: "Food",          date: "2026-04-03", note: "Dinner with friends" },
  { id: uid(), amount: 200,  category: "Others",        date: "2026-04-02", note: "Stationery" },
];