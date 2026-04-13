import { LayoutDashboard } from 'lucide-react'
import { glassChromeClass } from './components/GlassCard'
import { SummaryCards } from './components/SummaryCards'
import { ExpenseChart } from './components/ExpenseChart'
import { TransactionsList } from './components/TransactionsList'
import { InsightsPanel } from './components/InsightsPanel'
import { transactions as allTransactions } from './data/financeData'
import {
  WINDOW_DAYS,
  buildWeeklyExpenseBars,
  deriveSummary,
  filterTransactionsInWindow,
} from './utils/financeDerived'
import { getInsights } from './utils/insights'

export default function App() {
  const transactions = filterTransactionsInWindow(allTransactions, WINDOW_DAYS)
  const summary = deriveSummary(transactions)
  const weeklyExpenseBars = buildWeeklyExpenseBars(transactions)

  const insights = getInsights({
    summary,
    transactions,
    weeklyExpenseBars,
  })

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${glassChromeClass} text-cyan-400 ring-1 ring-white/[0.08] drop-shadow-[0_0_20px_rgba(34,211,238,0.22)]`}
          >
            <LayoutDashboard className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
              Overview
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Personal finance
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Dark glass UI with spending trends, recent activity, and
              lightweight insights driven by your mock data.
            </p>
          </div>
        </div>
        <div
          className={`rounded-xl px-4 py-2 text-xs text-slate-500 ${glassChromeClass}`}
        >
          Mock data · last {WINDOW_DAYS} days
        </div>
      </header>

      <section className="mb-10" aria-label="Summary">
        <SummaryCards
          totalBalance={summary.totalBalance}
          monthlyIncome={summary.monthlyIncome}
          monthlyExpenses={summary.monthlyExpenses}
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ExpenseChart weeklyExpenseBars={weeklyExpenseBars} />
        </div>
        <div className="lg:col-span-5">
          <InsightsPanel insights={insights} />
        </div>
      </div>

      <section className="mt-8" aria-label="Recent transactions">
        <TransactionsList transactions={transactions} />
      </section>

      <footer className="mt-12 border-t border-white/[0.06] pt-8 text-center text-xs text-slate-600">
        Built with Vite, React, Tailwind CSS, Chart.js, and Lucide.
      </footer>
    </div>
  )
}
