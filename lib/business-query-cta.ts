export type BusinessQueryType =
  | "BookDemo"
  | "ScheduleDemo"
  | "Contact"
  | "Sales"
  | "FleetDemo"
  | "General"

export function getBusinessQueryType(label?: string): BusinessQueryType | null {
  const text = (label ?? "").toLowerCase()

  if (!text) return null
  if (text.includes("fleet") && text.includes("demo")) return "FleetDemo"
  if (text.includes("book") && text.includes("demo")) return "BookDemo"
  if (text.includes("schedule") && text.includes("demo")) return "ScheduleDemo"
  if (text.includes("sale")) return "Sales"
  if (text.includes("contact")) return "Contact"
  if (text.includes("demo")) return "ScheduleDemo"

  return null
}
