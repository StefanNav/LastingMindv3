import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { phase4Categories } from '@/data/phase4Data'

export function Phase4PlaceholderPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const category = phase4Categories.find((c) => c.id === categoryId)

  return (
    <PageTransition>
      <div className="pointer-events-none sticky top-0 z-0 h-0">
        <img
          src="/images/onboarding/OnboardingBackground.png"
          alt=""
          className="h-[100vh] w-full object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-6 p-6 pt-14">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>

        {/* Content */}
        <div className="flex flex-col items-center gap-4 px-4 pt-16 text-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-lm-green/10">
            <span className="text-3xl">✏️</span>
          </div>
          <h1 className="font-display text-[24px] font-normal leading-[1.2] text-foreground">
            {category?.title ?? 'Activity'}
          </h1>
          <p className="text-sm leading-snug text-[var(--lm-text-secondary)]">
            {category?.subtitle ?? 'This activity is coming soon.'}
          </p>
          <div className="mt-6 rounded-[10px] bg-lm-bg-card/40 px-6 py-4 shadow-card backdrop-blur-sm">
            <p className="text-[11px] font-bold uppercase tracking-widest text-lm-gold">
              Coming Soon
            </p>
            <p className="mt-2 text-sm leading-snug text-[var(--lm-text-secondary)]">
              This activity flow is being built. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
