/** Rolling window for summary metrics and the transaction feed. */
export const WINDOW_DAYS = 30

export function parseTxDate(iso) {
  return new Date(`${iso}T12:00:00`)
}

export function filterTransactionsInWindow(transactions, days = WINDOW_DAYS, ref = new Date()) {
  const end = new Date(ref)
  end.setHours(23, 59, 59, 999)
  const start = new Date(ref)
  start.setDate(start.getDate() - (days - 1))
  start.setHours(0, 0, 0, 0)
  return transactions.filter((t) => {
    const d = parseTxDate(t.date)
    return d >= start && d <= end
  })
}

function startOfWeekMonday(d) {
  const x = new Date(d)
  const day = x.getDay()
  const diff = day === 0 ? -6 : 1 - day
  x.setDate(x.getDate() + diff)
  x.setHours(0, 0, 0, 0)
  return x
}

function formatWeekStart(d) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d)
}

/**
 * Sums absolute expense amounts per week (Mon–Sun), five weeks ending with the week that contains `ref`.
 * Oldest week first — suitable for a bar chart.
 */
export function buildWeeklyExpenseBars(transactionsWindowed, ref = new Date()) {
  const refNoon = new Date(ref)
  refNoon.setHours(12, 0, 0, 0)
  const currentWeekStart = startOfWeekMonday(refNoon)

  const weeks = []
  for (let i = 4; i >= 0; i--) {
    const wStart = new Date(currentWeekStart)
    wStart.setDate(wStart.getDate() - 7 * i)
    const wEnd = new Date(wStart)
    wEnd.setDate(wEnd.getDate() + 7)
    weeks.push({ start: wStart, end: wEnd, label: formatWeekStart(wStart) })
  }

  const amounts = weeks.map(() => 0)
  for (const t of transactionsWindowed) {
    if (t.type !== 'expense') continue
    const d = parseTxDate(t.date)
    const amt = Math.abs(Number(t.amount))
    for (let i = 0; i < weeks.length; i++) {
      if (d >= weeks[i].start && d < weeks[i].end) {
        amounts[i] += amt
        break
      }
    }
  }

  return weeks.map((w, i) => ({
    label: w.label,
    amount: Math.round(amounts[i] * 100) / 100,
  }))
}

/**
 * Opening book balance + net cash flow in the window = displayed total balance.
 */
export function deriveSummary(transactionsWindowed, openingBalance = 23240.0) {
  const netFlow = transactionsWindowed.reduce((s, t) => s + Number(t.amount), 0)
  const incomeTotal = transactionsWindowed
    .filter((t) => t.type === 'income')
    .reduce((s, t) => s + Math.abs(Number(t.amount)), 0)
  const expenseTotal = transactionsWindowed
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + Math.abs(Number(t.amount)), 0)

  return {
    totalBalance: Math.round((openingBalance + netFlow) * 100) / 100,
    monthlyIncome: Math.round(incomeTotal * 100) / 100,
    monthlyExpenses: Math.round(expenseTotal * 100) / 100,
  }
}
