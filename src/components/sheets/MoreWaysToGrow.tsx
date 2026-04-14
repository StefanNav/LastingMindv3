import { ChevronRight } from 'lucide-react'
import type { GrowthAction } from '@/types'

interface MoreWaysToGrowProps {
  actions: GrowthAction[]
  onAction?: (actionId: string) => void
}

export function MoreWaysToGrow({ actions, onAction }: MoreWaysToGrowProps) {
  return (
    <div className="flex flex-col gap-3 px-4 pb-2.5 pt-2">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-lm-gold/30" />
        <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
          More Ways to Grow
        </p>
        <div className="h-px flex-1 bg-lm-gold/30" />
      </div>

      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => onAction?.(action.id)}
          className="flex items-center justify-between rounded-[10px] bg-lm-bg-card/40 px-4 py-3.5 shadow-card backdrop-blur-sm transition-colors active:bg-lm-bg-card/60"
        >
          <p className="text-[14px] font-medium text-foreground">
            {action.label}
          </p>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </button>
      ))}
    </div>
  )
}
