import { useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import type { ProfileLifeChapter } from '@/types'

interface LifeStorySectionProps {
  chapters: ProfileLifeChapter[]
  phase1Complete: boolean
  onChapterTap?: (chapterNumber: number) => void
}

export function LifeStorySection({ chapters, phase1Complete, onChapterTap }: LifeStorySectionProps) {
  const navigate = useNavigate()
  // Locked — Phase 1 not complete
  if (!phase1Complete) {
    return (
      <div className="rounded-[10px] bg-lm-bg-card/40 px-5 py-5 shadow-card backdrop-blur-sm opacity-60">
        <p className="text-center text-sm leading-snug text-muted-foreground">
          Complete your Foundation to unlock your Life Story
        </p>
      </div>
    )
  }

  // Phase 1 complete but no chapters defined
  if (chapters.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[10px] bg-lm-bg-card/40 px-5 py-5 shadow-card backdrop-blur-sm">
        <p className="text-center font-display text-base font-medium text-foreground">
          Define your life chapters
        </p>
        <button
          type="button"
          onClick={() => navigate('/life-chapters/define')}
          className="rounded-[4px] bg-lm-green px-6 py-2 text-sm font-medium text-white transition-transform active:scale-[0.97]"
        >
          Get started
        </button>
      </div>
    )
  }

  // Chapters available
  return (
    <div className="flex flex-col gap-3">
      {chapters.map((ch) => (
        <button
          key={ch.chapterNumber}
          type="button"
          onClick={() => onChapterTap?.(ch.chapterNumber)}
          className="flex items-center gap-3 rounded-[10px] bg-lm-bg-card/40 px-4 py-3 shadow-card backdrop-blur-sm transition-transform active:scale-[0.98]"
        >
          <BookOpen className="size-4 shrink-0 text-muted-foreground" />
          <div className="flex flex-col items-start">
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Ch. {ch.chapterNumber} · {ch.dateRange}
            </p>
            <p className="text-left text-sm font-medium leading-tight text-foreground">
              {ch.title}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
