export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function fmtINR(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}