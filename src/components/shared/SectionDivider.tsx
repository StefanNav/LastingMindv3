import { cn } from '@/lib/utils'

interface SectionDividerProps {
  label: string
  variant?: 'gold' | 'muted'
  className?: string
}

export function SectionDivider({ label, variant = 'gold', className }: SectionDividerProps) {
  const color = variant === 'gold' ? 'text-lm-gold' : 'text-muted-foreground'
  const lineColor = variant === 'gold' ? 'bg-lm-gold/30' : 'bg-border'

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={`h-px flex-1 ${lineColor}`} />
      <p className={`shrink-0 text-[11px] font-bold uppercase tracking-widest ${color}`}>
        {label}
      </p>
      <div className={`h-px flex-1 ${lineColor}`} />
    </div>
  )
}
