import { Lightbulb, Sparkles } from 'lucide-react'
import { GlassCard, glassInsetClass } from './GlassCard'

const severityStyle = {
  positive: 'border-l-emerald-400/65 bg-emerald-500/[0.04]',
  tip: 'border-l-sky-400/55 bg-sky-500/[0.035]',
  notice: 'border-l-amber-400/60 bg-amber-500/[0.045]',
}

export function InsightsPanel({ insights }) {
  return (
    <GlassCard>
      <div className="mb-5 flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center ${glassInsetClass} text-violet-300 ring-1 ring-violet-500/20`}
        >
          <Sparkles className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight text-white">
            AI insights
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Pattern-based tips from your activity (static demo — no API calls)
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-3">
        {insights.map((item) => (
          <li
            key={item.id}
            className={`border-l-4 p-4 ${glassInsetClass} ${severityStyle[item.severity] || severityStyle.tip}`}
          >
            <div className="flex gap-3">
              <Lightbulb
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/90"
                strokeWidth={1.75}
              />
              <div>
                <p className="font-medium text-slate-100">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {item.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </GlassCard>
  )
}
