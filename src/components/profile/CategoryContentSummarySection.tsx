import { BookOpen } from 'lucide-react'
import type { CategoryContentSummary } from '@/types'

interface CategoryContentSummarySectionProps {
  summary: CategoryContentSummary
}

export function CategoryContentSummarySection({ summary }: CategoryContentSummarySectionProps) {
  const hasPeople = summary.people && summary.people.length > 0
  const hasEntries = summary.entries && summary.entries.length > 0
  const hasItems = summary.items && summary.items.length > 0

  if (!hasPeople && !hasEntries && !hasItems) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <h3 className="font-display text-base font-semibold text-foreground">
        What You've Shared
      </h3>

      {/* People list (Family, Friends) */}
      {hasPeople && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {summary.categoryLabel === 'Friends' ? 'Your Circle' : 'Your People'}
          </p>
          <div className="flex flex-wrap gap-2">
            {summary.people!.map((person) => (
              <div
                key={person.name}
                className="flex items-center gap-2 rounded-full bg-lm-bg-card/50 px-3 py-2 shadow-card backdrop-blur-sm"
              >
                <div className="flex size-7 items-center justify-center rounded-full border border-lm-green/40 bg-background">
                  <span className="text-xs font-bold text-lm-green">
                    {person.name.charAt(0)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold leading-tight text-foreground">
                    {person.name}
                  </span>
                  <span className="text-[10px] leading-tight text-muted-foreground">
                    {person.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Item chips (Favorites, Core Values) */}
      {hasItems && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {summary.categoryLabel === 'Core Values' ? 'Your Values' : 'Your Favorites'}
          </p>
          <div className="flex flex-wrap gap-2">
            {summary.items!.map((item) => (
              <div
                key={item.value}
                className="rounded-full bg-lm-bg-card/50 px-4 py-2 shadow-card backdrop-blur-sm"
              >
                <span className="text-[13px] font-semibold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Entry list (stories, letters, career entries, etc.) */}
      {hasEntries && (
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Stories & Entries
          </p>
          <div className="flex flex-col gap-2">
            {summary.entries!.map((entry) => (
              <div
                key={entry.title}
                className="flex items-start gap-3 rounded-[10px] bg-lm-bg-card/40 px-4 py-3 shadow-card backdrop-blur-sm"
              >
                <BookOpen className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="text-[13px] font-semibold leading-tight text-foreground">
                    {entry.title}
                  </p>
                  <p className="line-clamp-2 text-[12px] leading-snug text-muted-foreground">
                    {entry.snippet}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground/60">
                    {entry.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
