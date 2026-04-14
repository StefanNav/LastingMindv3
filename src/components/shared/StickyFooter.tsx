import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StickyFooterProps {
  children: ReactNode
  className?: string
}

export function StickyFooter({ children, className }: StickyFooterProps) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-20 border-t border-border/50 bg-[var(--lm-bg-primary)]/95 px-5 pb-8 pt-4 backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </div>
  )
}
