export function formatKg(n: number) {
  return `${n.toLocaleString(undefined, { maximumFractionDigits: 2 })} kg CO2e`;
}
