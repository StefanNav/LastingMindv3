interface BiographyCTAProps {
  biographyReady: boolean
  phase1Complete: boolean
  onTap?: () => void
}

export function BiographyCTA({ biographyReady, phase1Complete, onTap }: BiographyCTAProps) {
  // Hidden if Phase 1 not even complete
  if (!phase1Complete) return null

  if (biographyReady) {
    return (
      <button
        type="button"
        onClick={onTap}
        className="flex w-full items-center justify-center rounded-lg bg-lm-green px-4 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
      >
        Read your biography
      </button>
    )
  }

  return (
    <div className="flex items-center gap-4 rounded-[10px] bg-lm-bg-card/40 px-5 py-4 shadow-card backdrop-blur-sm">
      <img
        src="/images/bio.png"
        alt=""
        className="size-16 shrink-0 object-contain"
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold leading-snug text-foreground">
          Your biography is being written
        </p>
        <p className="text-xs leading-snug text-muted-foreground">
          Complete your Life Story to unlock it.
        </p>
      </div>
    </div>
  )
}
