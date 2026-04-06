import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'

export function LifeChaptersHubPage() {
  const navigate = useNavigate()
  const { lifeChapters } = useApp()

  const formatDateRange = (ch: typeof lifeChapters[number]) => {
    const parts: string[] = []
    if (ch.startYear !== null) parts.push(String(ch.startYear))
    if (ch.endYear !== null) parts.push(ch.endYear === 'Present' ? 'Present' : String(ch.endYear))
    return parts.length > 0 ? parts.join(' – ') : ''
  }

  return (
    <PageTransition>
      {/* Background image */}
      <div className="pointer-events-none sticky top-0 z-0 h-0">
        <img
          src="/images/onboarding/OnboardingBackground.png"
          alt=""
          className="h-[100vh] w-full object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col gap-5 p-6 pt-14">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="shrink-0 rounded-full p-1 text-foreground transition-colors hover:bg-muted"
            aria-label="Back to home"
          >
            <ArrowLeft className="size-5" />
          </button>
          <h2 className="flex-1 text-center font-display text-2xl font-semibold text-foreground pr-7">
            Life Chapters
          </h2>
        </div>

        {/* Intro */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          Your chapters are ready. Each one will become a storytelling session where you share the memories and moments that defined this stage of your life.
        </p>

        {/* Section divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-lm-gold/30" />
          <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
            Your Chapters
          </p>
          <div className="h-px flex-1 bg-lm-gold/30" />
        </div>

        {/* Chapter list */}
        {lifeChapters.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-[10px] bg-lm-bg-card/40 px-5 py-8 shadow-card backdrop-blur-sm">
            <p className="text-center text-sm text-muted-foreground">
              No chapters defined yet.
            </p>
            <button
              type="button"
              onClick={() => navigate('/life-chapters/define')}
              className="rounded-[4px] bg-lm-green px-6 py-2 text-sm font-medium text-white transition-transform active:scale-[0.97]"
            >
              Define your chapters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {lifeChapters.map((ch, i) => {
              const dateRange = formatDateRange(ch)
              return (
                <div
                  key={ch.id}
                  className="flex items-center justify-between rounded-[10px] bg-lm-bg-card/40 px-5 py-4 shadow-card backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                      Ch. {i + 1}{dateRange ? ` · ${dateRange}` : ''}
                    </p>
                    <p className="font-display text-base font-normal leading-tight text-foreground">
                      {ch.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground/60">
                      Not yet started
                    </p>
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
                </div>
              )
            })}
          </div>
        )}

        {/* Edit chapters link */}
        {lifeChapters.length > 0 && (
          <button
            type="button"
            onClick={() => navigate('/life-chapters/define')}
            className="self-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Edit chapters
          </button>
        )}

        {/* Bottom padding */}
        <div className="pb-4" />
      </div>
    </PageTransition>
  )
}
