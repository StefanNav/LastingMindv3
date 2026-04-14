import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SecondaryCTAProps {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function SecondaryCTA({ children, onClick, disabled, className }: SecondaryCTAProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/50 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        className,
      )}
    >
      {children}
    </button>
  )
}
