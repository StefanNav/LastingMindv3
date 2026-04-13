export function CardBack() {
  return (
    <div className="flex h-[360px] w-[260px] flex-col overflow-hidden rounded-2xl border border-[var(--lm-border)] bg-[var(--lm-bg-card)]"
      style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)' }}
    >
      {/* Green header strip */}
      <div className="flex h-[72px] shrink-0 items-center justify-center bg-lm-green">
        <p className="font-display text-[16px] font-semibold leading-[1.2] tracking-wide text-white">
          LastingMind
        </p>
      </div>

      {/* Card body — splash-page style with background + tree */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Parchment background */}
        <img
          src="/images/onboarding/OnboardingBackground.png"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* Tree illustration */}
        <img
          src="/images/onboarding/SplashPageTree.png"
          alt=""
          className="pointer-events-none relative z-10 h-[180px] w-[180px] object-contain opacity-80"
        />
      </div>
    </div>
  )
}
