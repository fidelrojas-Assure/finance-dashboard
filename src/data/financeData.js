/** ISO date string for `n` calendar days before today (local). */
function daysAgoISO(n) {
  const d = new Date()
  d.setHours(12, 0, 0, 0)
  d.setDate(d.getDate() - n)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Ten realistic transactions: last 30 days, categories
 * Food, Transport, Entertainment, Utilities, Health (+ Income).
 */
export const transactions = [
  {
    id: 'tx-01',
    name: 'CVS Pharmacy',
    category: 'Health',
    date: daysAgoISO(0),
    amount: -22.45,
    type: 'expense',
  },
  {
    id: 'tx-02',
    name: 'DoorDash',
    category: 'Food',
    date: daysAgoISO(1),
    amount: -38.9,
    type: 'expense',
  },
  {
    id: 'tx-03',
    name: 'Payroll — Meridian LLC',
    category: 'Income',
    date: daysAgoISO(2),
    amount: 4100.0,
    type: 'income',
  },
  {
    id: 'tx-04',
    name: 'Uber',
    category: 'Transport',
    date: daysAgoISO(3),
    amount: -26.0,
    type: 'expense',
  },
  {
    id: 'tx-05',
    name: 'AMC Theatres',
    category: 'Entertainment',
    date: daysAgoISO(5),
    amount: -42.0,
    type: 'expense',
  },
  {
    id: 'tx-06',
    name: 'City Electric & Water',
    category: 'Utilities',
    date: daysAgoISO(7),
    amount: -201.33,
    type: 'expense',
  },
  {
    id: 'tx-07',
    name: 'Kroger',
    category: 'Food',
    date: daysAgoISO(10),
    amount: -97.55,
    type: 'expense',
  },
  {
    id: 'tx-08',
    name: 'Regional Transit — monthly pass',
    category: 'Transport',
    date: daysAgoISO(14),
    amount: -119.0,
    type: 'expense',
  },
  {
    id: 'tx-09',
    name: 'Freelance — UI audit',
    category: 'Income',
    date: daysAgoISO(18),
    amount: 875.0,
    type: 'income',
  },
  {
    id: 'tx-10',
    name: 'Live Nation — tickets',
    category: 'Entertainment',
    date: daysAgoISO(24),
    amount: -95.0,
    type: 'expense',
  },
]
