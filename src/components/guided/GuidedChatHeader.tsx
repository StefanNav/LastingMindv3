import { ArrowLeft } from 'lucide-react'

interface GuidedChatHeaderProps {
  moduleTitle: string
  progressLabel: string
  onBack: () => void
}

export function GuidedChatHeader({ moduleTitle, progressLabel, onBack }: GuidedChatHeaderProps) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-border/50 bg-[var(--lm-bg-primary)]/80 px-4 pb-3 pt-[62px] backdrop-blur-sm">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 rounded-[4px] bg-lm-neutral-warm p-1.5"
      >
        <ArrowLeft className="size-5 text-white" />
      </button>

      <p className="font-display text-[18px] font-semibold leading-[1.2] text-foreground">
        {moduleTitle}
      </p>

      <span className="text-[13px] font-medium text-muted-foreground">
        {progressLabel}
      </span>
    </div>
  )
}
