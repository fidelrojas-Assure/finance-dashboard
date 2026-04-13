import { ArrowDownLeft, ArrowUpRight, Receipt } from 'lucide-react'
import { GlassCard, glassInsetClass } from './GlassCard'

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const dateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

const categoryStyles = {
  Income: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/25',
  Food: 'bg-amber-500/15 text-amber-200 ring-amber-500/25',
  Transport: 'bg-sky-500/15 text-sky-200 ring-sky-500/25',
  Entertainment: 'bg-violet-500/15 text-violet-200 ring-violet-500/25',
  Utilities: 'bg-slate-500/20 text-slate-300 ring-slate-500/30',
  Health: 'bg-rose-500/12 text-rose-200 ring-rose-500/25',
}

export function TransactionsList({ transactions }) {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  )

  return (
    <GlassCard>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight text-white">
            Recent transactions
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Newest activity across accounts
          </p>
        </div>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center ${glassInsetClass} text-slate-300 ring-1 ring-white/[0.12]`}
        >
          <Receipt className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>
      <ul className="divide-y divide-white/[0.06]">
        {sorted.map((t) => {
          const isIn = t.type === 'income'
          const catClass =
            categoryStyles[t.category] ||
            'bg-white/5 text-slate-300 ring-white/10'
          return (
            <li
              key={t.id}
              className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center ${glassInsetClass} ring-1 ${
                  isIn
                    ? 'text-emerald-400 ring-emerald-500/25'
                    : 'text-rose-300 ring-rose-500/25'
                }`}
              >
                {isIn ? (
                  <ArrowDownLeft className="h-4 w-4" strokeWidth={2} />
                ) : (
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-100">{t.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${catClass}`}
                  >
                    {t.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    {dateFmt.format(new Date(t.date))}
                  </span>
                </div>
              </div>
              <span
                className={`shrink-0 font-mono text-sm font-semibold tabular-nums ${
                  isIn ? 'text-emerald-400' : 'text-slate-200'
                }`}
              >
                {isIn ? '+' : ''}
                {money.format(t.amount)}
              </span>
            </li>
          )
        })}
      </ul>
    </GlassCard>
  )
}
