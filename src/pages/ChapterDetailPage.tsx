import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { PageTransition } from '@/animations/PageTransition'
import { useApp } from '@/app/AppProvider'
import { getChapterDetailData } from '@/data/chapterDetailData'
import { BackButton } from '@/components/shared/BackButton'

export function ChapterDetailPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const navigate = useNavigate()
  const { lifeChapters } = useApp()

  const chapter = lifeChapters.find((ch) => ch.id === chapterId)

  if (!chapterId || !chapter) {
    return (
      <PageTransition>
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-muted-foreground">Chapter not found.</p>
        </div>
      </PageTransition>
    )
  }

  const chapterIndex = lifeChapters.indexOf(chapter) + 1
  const dateRange = formatDateRange(chapter)
  const { description, entries } = getChapterDetailData(chapterId)

  return (
    <PageTransition>
      <div className="bg-[var(--lm-bg-primary)]">
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
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <BackButton onClick={() => navigate('/profile')} ariaLabel="Back to profile" />
              <p className="flex-1 text-center text-[11px] font-bold uppercase tracking-wide text-lm-gold pr-7">
                Ch. {chapterIndex}{dateRange ? ` · ${dateRange}` : ''}
              </p>
            </div>
            <h2 className="text-center font-display text-2xl font-semibold text-foreground">
              {chapter.title}
            </h2>
          </div>

          {/* Description — multi-paragraph book-style prose */}
          <div className="flex flex-col gap-4">
            {description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Entries section */}
          {entries.length > 0 ? (
            <div className="flex flex-col gap-4">
              {/* Section divider */}
              <div className="flex items-center gap-3 mt-2">
                <div className="h-px flex-1 bg-lm-gold/30" />
                <p className="shrink-0 text-[11px] font-bold uppercase tracking-widest text-lm-gold">
                  Entries
                </p>
                <div className="h-px flex-1 bg-lm-gold/30" />
              </div>

              {/* Entry cards */}
              {entries.map((entry) => (
                <ChapterEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm text-center">
              <p className="text-sm text-muted-foreground">
                No entries recorded for this chapter yet.
              </p>
            </div>
          )}

          {/* Bottom padding */}
          <div className="pb-4" />
        </div>
      </div>
    </PageTransition>
  )
}

function ChapterEntryCard({ entry }: { entry: import('@/types').ChapterEntry }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className="flex w-full flex-col gap-2 rounded-[10px] bg-lm-bg-card/40 p-5 shadow-card backdrop-blur-sm text-left transition-transform active:scale-[0.98]"
    >
      <div className="flex w-full flex-col gap-1">
        <h3 className="font-display text-base font-semibold leading-tight text-foreground">
          {entry.title}
        </h3>
        <p className="text-[11px] font-medium uppercase tracking-wide text-lm-gold">
          {entry.date}
        </p>
      </div>

      <p className={`text-sm leading-relaxed text-foreground/80 ${expanded ? '' : 'line-clamp-2'}`}>
        {entry.body}
      </p>

      {!expanded && (
        <span className="flex items-center gap-0.5 text-xs font-medium text-primary">
          Show more <ChevronDown className="size-3" />
        </span>
      )}
    </button>
  )
}

function formatDateRange(chapter: { startYear: number | null; endYear: number | 'Present' | null }) {
  const parts: string[] = []
  if (chapter.startYear !== null) parts.push(String(chapter.startYear))
  if (chapter.endYear !== null) parts.push(chapter.endYear === 'Present' ? 'Present' : String(chapter.endYear))
  return parts.join(' – ')
}
