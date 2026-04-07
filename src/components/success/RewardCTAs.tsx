import { ArrowRight } from 'lucide-react'

interface RewardPrimaryCTAProps {
  label: string
  onClick: () => void
}

export function RewardPrimaryCTA({ label, onClick }: RewardPrimaryCTAProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-lm-green px-4 py-3 transition-transform active:scale-[0.97]"
    >
      <span className="text-sm font-semibold text-white">{label}</span>
      <ArrowRight className="size-4 text-white" />
    </button>
  )
}

interface RewardSecondaryCTAProps {
  label?: string
  onClick: () => void
}

export function RewardSecondaryCTA({ label = 'Done for now', onClick }: RewardSecondaryCTAProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-lg border border-lm-border bg-lm-bg-card px-4 py-3 transition-transform active:scale-[0.97]"
    >
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </button>
  )
}
