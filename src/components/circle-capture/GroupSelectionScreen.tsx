import { cn } from '@/lib/utils'
import { BackButton } from '@/components/shared/BackButton'
import { PrimaryCTA } from '@/components/shared/PrimaryCTA'
import { StickyFooter } from '@/components/shared/StickyFooter'
import { NONE_GROUP_ID } from '@/data/circleCaptureData'
import type { CircleCaptureGroup } from '@/types'

interface GroupSelectionScreenProps {
  categoryLabel: string
  contextLine: string
  promptText: string
  groups: CircleCaptureGroup[]
  selectedGroupIds: string[]
  isNoneSelected: boolean
  canStart: boolean
  onToggleGroup: (groupId: string) => void
  onStart: () => void
  onBack: () => void
}

export function GroupSelectionScreen({
  categoryLabel,
  contextLine,
  promptText,
  groups,
  selectedGroupIds,
  isNoneSelected,
  canStart,
  onToggleGroup,
  onStart,
  onBack,
}: GroupSelectionScreenProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border/50 bg-[var(--lm-bg-primary)]/80 px-4 pb-3 pt-[62px] backdrop-blur-sm">
        <BackButton onClick={onBack} />
        <p className="font-display text-[18px] font-semibold leading-[1.2] text-foreground">
          {categoryLabel}
        </p>
        <div className="w-[28px]" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-y-auto px-5 pt-8">
        <p className="mb-2 text-center font-display text-[18px] font-semibold leading-tight text-foreground">
          {promptText}
        </p>
        <p className="mb-6 text-center text-[14px] leading-[1.5] text-muted-foreground">
          {contextLine}
        </p>

        <div className="flex flex-col gap-3">
          {groups.map((group) => {
            const isSelected = selectedGroupIds.includes(group.id)
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => onToggleGroup(group.id)}
                className={cn(
                  'flex items-center rounded-xl border px-4 py-3.5 text-left transition-colors',
                  isSelected
                    ? 'border-lm-green bg-primary/10'
                    : 'border-border bg-background',
                )}
              >
                {/* Checkbox indicator */}
                <div
                  className={cn(
                    'mr-3 flex size-5 shrink-0 items-center justify-center rounded border transition-colors',
                    isSelected
                      ? 'border-lm-green bg-lm-green'
                      : 'border-muted-foreground/40 bg-transparent',
                  )}
                >
                  {isSelected && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span
                  className={cn(
                    'text-[15px] font-medium leading-snug',
                    isSelected ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {group.label}
                </span>
              </button>
            )
          })}

          {/* None of the above */}
          <button
            type="button"
            onClick={() => onToggleGroup(NONE_GROUP_ID)}
            className={cn(
              'flex items-center rounded-xl border px-4 py-3.5 text-left transition-colors',
              isNoneSelected
                ? 'border-lm-green bg-primary/10'
                : 'border-border bg-background',
            )}
          >
            <div
              className={cn(
                'mr-3 flex size-5 shrink-0 items-center justify-center rounded border transition-colors',
                isNoneSelected
                  ? 'border-lm-green bg-lm-green'
                  : 'border-muted-foreground/40 bg-transparent',
              )}
            >
              {isNoneSelected && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span
              className={cn(
                'text-[15px] font-medium leading-snug',
                isNoneSelected ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Skip and add names manually
            </span>
          </button>
        </div>
      </div>

      {/* CTA */}
      <StickyFooter>
        <PrimaryCTA onClick={onStart} disabled={!canStart}>
          Start
        </PrimaryCTA>
      </StickyFooter>
    </div>
  )
}
