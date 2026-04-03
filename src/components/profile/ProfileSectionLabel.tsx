interface ProfileSectionLabelProps {
  label: string
  variant?: 'default' | 'gold'
}

export function ProfileSectionLabel({ label, variant = 'default' }: ProfileSectionLabelProps) {
  const color = variant === 'gold' ? 'text-lm-gold' : 'text-muted-foreground'
  const lineColor = variant === 'gold' ? 'bg-lm-gold/30' : 'bg-border'

  return (
    <div className="flex items-center gap-3">
      <div className={`h-px flex-1 ${lineColor}`} />
      <p className={`shrink-0 text-[11px] font-bold uppercase tracking-widest ${color}`}>
        {label}
      </p>
      <div className={`h-px flex-1 ${lineColor}`} />
    </div>
  )
}
