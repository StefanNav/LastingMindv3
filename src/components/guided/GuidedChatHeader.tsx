import { BackButton } from '@/components/shared/BackButton'

interface GuidedChatHeaderProps {
  moduleTitle: string
  progressLabel: string
  onBack: () => void
}

export function GuidedChatHeader({ moduleTitle, progressLabel, onBack }: GuidedChatHeaderProps) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-border/50 bg-[var(--lm-bg-primary)]/80 px-4 pb-3 pt-[62px] backdrop-blur-sm">
      <BackButton onClick={onBack} />

      <p className="font-display text-[18px] font-semibold leading-[1.2] text-foreground">
        {moduleTitle}
      </p>

      <span className="text-[13px] font-medium text-muted-foreground">
        {progressLabel}
      </span>
    </div>
  )
}
