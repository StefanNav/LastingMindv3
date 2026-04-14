import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PrimaryCTAProps {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function PrimaryCTA({ children, onClick, disabled, className }: PrimaryCTAProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        className,
      )}
    >
      {children}
    </button>
  )
}
