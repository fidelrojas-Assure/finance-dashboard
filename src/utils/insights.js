/**
 * Static AI-style tips derived from spending patterns (no external API).
 */
export function getInsights({ summary, transactions, weeklyExpenseBars }) {
  const tips = []

  const expenseTx = transactions.filter((t) => t.type === 'expense')
  const totalSpent = expenseTx.reduce((s, t) => s + Math.abs(Number(t.amount)), 0)

  const byCategory = expenseTx.reduce((acc, t) => {
    const key = t.category
    acc[key] = (acc[key] || 0) + Math.abs(Number(t.amount))
    return acc
  }, {})

  const share = (cat) =>
    totalSpent > 0 ? (byCategory[cat] || 0) / totalSpent : 0

  const foodShare = share('Food')
  const entertainmentShare = share('Entertainment')
  const transportShare = share('Transport')
  const utilitiesShare = share('Utilities')
  const healthShare = share('Health')

  const savingsRate =
    summary.monthlyIncome > 0
      ? (summary.monthlyIncome - summary.monthlyExpenses) / summary.monthlyIncome
      : 0

  if (foodShare >= 0.2) {
    tips.push({
      id: 'food',
      severity: 'notice',
      title: 'Food spend stands out',
      body: `About ${Math.round(foodShare * 100)}% of outflows in this period went to food. Planning a few home-cooked meals often trims this category without much sacrifice.`,
    })
  }

  if (entertainmentShare >= 0.12) {
    tips.push({
      id: 'entertainment',
      severity: 'tip',
      title: 'Entertainment is a sizable share',
      body: 'Events and subscriptions add up quickly. Try a monthly “fun budget” cap so the rest of your plan stays on autopilot.',
    })
  }

  if (transportShare >= 0.25) {
    tips.push({
      id: 'transport',
      severity: 'tip',
      title: 'Transport costs are prominent',
      body: 'Passes and rideshare stack fast. If you commute often, compare a monthly pass to pay-per-ride totals you actually hit.',
    })
  }

  if (utilitiesShare >= 0.28) {
    tips.push({
      id: 'utilities',
      severity: 'tip',
      title: 'Utilities are pulling weight',
      body: `Roughly ${Math.round(utilitiesShare * 100)}% of spending went to utilities. Seasonal usage audits (HVAC, water heater) can shave predictable waste.`,
    })
  }

  if (healthShare >= 0.08 && healthShare < 0.35) {
    tips.push({
      id: 'health',
      severity: 'positive',
      title: 'Health spending looks intentional',
      body: 'Pharmacy and clinic copays in this band are usually planned. Keep receipts for HSA/FSA eligibility if those accounts apply.',
    })
  }

  if (savingsRate >= 0.35) {
    tips.push({
      id: 'savings',
      severity: 'positive',
      title: 'Strong savings buffer',
      body: `You're directing roughly ${Math.round(savingsRate * 100)}% of inflows after expenses in this window. Consider parking part in a high-yield cash bucket for near-term goals.`,
    })
  } else if (savingsRate >= 0.15 && savingsRate < 0.35) {
    tips.push({
      id: 'savings-mid',
      severity: 'tip',
      title: 'Room to tighten cash flow',
      body: 'Automating a small transfer on payday builds the habit before you scale the amount.',
    })
  }

  const lastTwo = weeklyExpenseBars.slice(-2)
  if (
    lastTwo.length === 2 &&
    lastTwo[0].amount > 0 &&
    lastTwo[1].amount > lastTwo[0].amount * 1.12
  ) {
    tips.push({
      id: 'trend',
      severity: 'notice',
      title: 'Spending stepped up recently',
      body: 'The latest full week is noticeably higher than the prior one. Check whether that was timing (bills) or a new baseline.',
    })
  }

  if (tips.length === 0) {
    tips.push({
      id: 'default',
      severity: 'tip',
      title: 'Keep tracking consistently',
      body: 'Patterns sharpen over a few weeks. Tag transactions and revisit weekly so insights stay actionable.',
    })
  }

  return tips
}
