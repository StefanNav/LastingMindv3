import type { RecentEntry } from '@/types'

interface RecentEntryCardProps {
  entries: RecentEntry[]
  totalCount?: number
  onViewAll?: () => void
}

export function RecentEntryCard({ entries, totalCount, onViewAll }: RecentEntryCardProps) {
  const count = totalCount ?? entries.length

  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="flex items-center">
        <p className="flex-1 text-[14px] font-semibold leading-[1.2] text-muted-foreground">
          Recent Entries
        </p>
        <button
          type="button"
          onClick={onViewAll}
          className="rounded-[4px] bg-primary/10 px-2.5 py-0.5"
        >
          <p className="text-center text-[14px] font-semibold leading-[1.2] text-lm-green-dark">
            View all ({count})
          </p>
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-[10px] border border-border bg-lm-bg-card p-3"
          >
            <div className="flex gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-lm-green bg-background">
                <p className="text-base font-bold leading-none text-lm-green">
                  {entry.memberInitial}
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] font-semibold leading-[1.2] text-foreground">
                    {entry.title}
                  </p>
                  <p className="text-[14px] font-medium leading-[1.2] tracking-[0.5px] text-muted-foreground">
                    {entry.snippet}
                  </p>
                </div>
                <p className="text-[12px] leading-[1.2] tracking-[0.5px] text-muted-foreground">
                  {entry.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
