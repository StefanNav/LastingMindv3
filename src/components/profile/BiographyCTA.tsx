import { cn } from '@/lib/utils'

interface BiographyCTAProps {
  biographyReady: boolean
  phase1Complete: boolean
  onTap?: () => void
}

export function BiographyCTA({ biographyReady, phase1Complete, onTap }: BiographyCTAProps) {
  // Hidden if Phase 1 not even complete
  if (!phase1Complete) return null

  return (
    <button
      type="button"
      onClick={biographyReady ? onTap : undefined}
      disabled={!biographyReady}
      className={cn(
        'flex w-full items-center justify-center rounded-[4px] px-10 py-4 transition-transform',
        biographyReady
          ? 'bg-lm-green active:scale-[0.98]'
          : 'bg-lm-green/40 cursor-not-allowed',
      )}
    >
      <span className="text-[16px] font-medium leading-[1.2] text-white">
        {biographyReady ? 'Read your biography' : 'Complete your Life Story to unlock'}
      </span>
    </button>
  )
}
