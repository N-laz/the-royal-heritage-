// All stay dates are handled as UTC-midnight Date objects built from "YYYY-MM-DD" strings.

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

export function isISODate(value: string): boolean {
  if (!ISO_RE.test(value)) return false;
  const d = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

export function parseISODate(value: string): Date {
  if (!isISODate(value)) throw new Error(`Invalid date: ${value}`);
  return new Date(`${value}T00:00:00.000Z`);
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

export function addDaysISO(iso: string, days: number): string {
  return toISODate(addDays(parseISODate(iso), days));
}

export function nightsBetween(checkIn: Date, checkOut: Date): number {
  return Math.round((checkOut.getTime() - checkIn.getTime()) / DAY_MS);
}

export function eachNight(checkIn: Date, checkOut: Date): Date[] {
  const nights: Date[] = [];
  for (let d = checkIn; d < checkOut; d = addDays(d, 1)) nights.push(d);
  return nights;
}

/** Today's date at the resort (India Standard Time) as YYYY-MM-DD. */
export function todayISO(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function todayDate(): Date {
  return parseISODate(todayISO());
}
