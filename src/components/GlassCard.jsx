/**
 * Shared glassmorphism surface: frosted semi-transparent layer, soft shadow, subtle white border.
 * Tuned for the app dark background.
 */
const glassBase =
  'border border-white/[0.12] bg-white/[0.065] backdrop-blur-2xl backdrop-saturate-150'

const glassShadowPanel =
  'shadow-[0_12px_48px_-10px_rgba(0,0,0,0.55),inset_0_1px_0_0_rgba(255,255,255,0.10)]'

const glassShadowInset =
  'shadow-[0_6px_28px_-8px_rgba(0,0,0,0.48),inset_0_1px_0_0_rgba(255,255,255,0.08)]'

const glassShadowChrome =
  'shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.09)]'

/** Main dashboard cards (chart, transactions, insights shell, summary). */
export const glassPanelClass = `rounded-2xl ${glassBase} ${glassShadowPanel}`

/** Nested cards (e.g. insight rows, icon wells) — softer lift, slightly lighter fill. */
export const glassInsetClass = `rounded-xl ${glassBase} bg-white/[0.05] ${glassShadowInset}`

/** Header icon / pill — add your own `rounded-*` (e.g. rounded-2xl / rounded-xl). */
export const glassChromeClass = `${glassBase} ${glassShadowChrome}`

export function GlassCard({ children, className = '', noPadding = false }) {
  return (
    <div
      className={`${glassPanelClass} ${noPadding ? '' : 'p-6'} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
