import { Wallet, TrendingDown, TrendingUp } from 'lucide-react'
import { GlassCard, glassInsetClass } from './GlassCard'

const fmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function SummaryCards({ totalBalance, monthlyIncome, monthlyExpenses }) {
  const net = monthlyIncome - monthlyExpenses

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <GlassCard className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Total balance</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-white">
              {fmt.format(totalBalance)}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Net (30 days){' '}
              <span className={net >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {net >= 0 ? '+' : ''}
                {fmt.format(net)}
              </span>
            </p>
          </div>
          <span
            className={`flex h-11 w-11 items-center justify-center ${glassInsetClass} text-cyan-400 ring-1 ring-cyan-500/25`}
          >
            <Wallet className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>
      </GlassCard>

      <GlassCard className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-emerald-500/15 blur-2xl" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Income</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-emerald-400">
              {fmt.format(monthlyIncome)}
            </p>
            <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500/80" />
              Recurring + variable inflows
            </p>
          </div>
          <span
            className={`flex h-11 w-11 items-center justify-center ${glassInsetClass} text-emerald-400 ring-1 ring-emerald-500/25`}
          >
            <TrendingUp className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>
      </GlassCard>

      <GlassCard className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-violet-500/15 blur-2xl" />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Expenses</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-rose-300">
              {fmt.format(monthlyExpenses)}
            </p>
            <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
              <TrendingDown className="h-3.5 w-3.5 text-rose-400/80" />
              vs income:{' '}
              {((monthlyExpenses / monthlyIncome) * 100).toFixed(0)}%
            </p>
          </div>
          <span
            className={`flex h-11 w-11 items-center justify-center ${glassInsetClass} text-rose-300 ring-1 ring-rose-500/25`}
          >
            <TrendingDown className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>
      </GlassCard>
    </div>
  )
}
