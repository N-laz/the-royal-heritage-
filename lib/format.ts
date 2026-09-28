const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(amount: number): string {
  return inr.format(Math.round(amount));
}

/** Formats a stay date (UTC midnight / YYYY-MM-DD). */
export function formatDate(value: string | Date, style: "long" | "short" | "medium" = "medium"): string {
  const date = typeof value === "string" ? new Date(value.length === 10 ? `${value}T00:00:00.000Z` : value) : value;
  const options: Intl.DateTimeFormatOptions =
    style === "long"
      ? { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
      : style === "short"
        ? { day: "numeric", month: "short", timeZone: "UTC" }
        : { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat("en-IN", options).format(date);
}

/** Formats a timestamp in India Standard Time. */
export function formatDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function plural(count: number, one: string, many?: string): string {
  return `${count} ${count === 1 ? one : many ?? `${one}s`}`;
}

export function paymentLabel(method: string, last4?: string | null): string {
  if (method === "CARD") return `Card ending ${last4 ?? "••••"}`;
  if (method === "UPI") return "UPI";
  return "Pay at hotel";
}
