import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'

export function ChapterSessionPlaceholder() {
  const { chapterId, stepType } = useParams<{ chapterId: string; stepType: string }>()
  const navigate = useNavigate()
  const { lifeChapters } = useApp()

  const chapter = lifeChapters.find((ch) => ch.id === chapterId)
  const title = chapter?.title ?? 'Chapter'
  const stepLabel = stepType === 'deeper' ? 'Diving Deeper' : 'Conversation'

  return (
    <PageTransition>
      {/* Background */}
      <div className="pointer-events-none sticky top-0 z-0 h-0">
        <img
          src="/images/onboarding/OnboardingBackground.png"
          alt=""
          className="h-[100vh] w-full object-cover"
        />
      </div>

      <div className="relative z-10 flex min-h-[80vh] flex-col items-center justify-center gap-6 p-6">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="absolute left-4 top-14 shrink-0 rounded-full p-1 text-foreground transition-colors hover:bg-muted"
          aria-label="Back to home"
        >
          <ArrowLeft className="size-5" />
        </button>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-lm-gold">
            {stepLabel}
          </p>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="max-w-[280px] text-sm leading-relaxed text-muted-foreground">
            This session will be available in a future update. For now, this is a placeholder for the {stepLabel.toLowerCase()} flow.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/home')}
          className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          Back to Home
        </button>
      </div>
    </PageTransition>
  )
}
