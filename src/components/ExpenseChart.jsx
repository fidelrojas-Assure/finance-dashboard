import { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { BarChart3 } from 'lucide-react'
import { GlassCard, glassInsetClass } from './GlassCard'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export function ExpenseChart({ weeklyExpenseBars }) {
  const data = useMemo(
    () => ({
      labels: weeklyExpenseBars.map((b) => b.label),
      datasets: [
        {
          label: 'Expenses this week',
          data: weeklyExpenseBars.map((b) => b.amount),
          borderRadius: 10,
          borderSkipped: false,
          backgroundColor: (ctx) => {
            const c = ctx.chart.ctx
            const g = c.createLinearGradient(0, 0, 0, 220)
            g.addColorStop(0, 'rgba(56, 189, 248, 0.85)')
            g.addColorStop(1, 'rgba(139, 92, 246, 0.35)')
            return g
          },
          hoverBackgroundColor: 'rgba(56, 189, 248, 0.95)',
          maxBarThickness: 36,
        },
      ],
    }),
    [weeklyExpenseBars],
  )

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 17, 24, 0.92)',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          titleColor: '#e2e8f0',
          bodyColor: '#94a3b8',
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: (ctx) =>
              ` ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(ctx.parsed.y)}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#64748b', font: { size: 11 } },
          border: { display: false },
        },
        y: {
          grid: { color: 'rgba(148, 163, 184, 0.08)' },
          ticks: {
            color: '#64748b',
            font: { size: 11 },
            callback: (v) =>
              v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`,
          },
          border: { display: false },
        },
      },
    }),
    [],
  )

  return (
    <GlassCard>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight text-white">
            Spending by week
          </h2>
          <p className="mt-0.5 text-sm text-slate-500">
            Totals from expenses in the last 30 days, grouped by week (Mon–Sun)
          </p>
        </div>
        <span
          className={`hidden h-10 w-10 shrink-0 items-center justify-center sm:flex ${glassInsetClass} text-sky-400 ring-1 ring-sky-500/25`}
        >
          <BarChart3 className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>
      <div className="h-[280px] w-full">
        <Bar data={data} options={options} />
      </div>
    </GlassCard>
  )
}
